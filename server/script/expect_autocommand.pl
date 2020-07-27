#!/usr/bin/perl

use strict;
use warnings;
use autodie;
use Switch;
use Expect;
use Capture::Tiny ':all';
use DBI;

#$Expect::Multiline_Matching = 0;

use constant {
	# command control
	EC_SUCCESS => 0,
	EC_CHECKING => 1,
	EC_ALIVE => 2,
	EC_ALIVE_SSH => 3,
	EC_SUCCESS_PASSWD => 4,
	EC_DEAD => 9,
	EC_ARG_ERROR => 11,
	EC_SVR_WRNG_ACCOUNT => 12,
	EC_CONN_FAILED => 13,
	EC_DB_ERROR => 14,
	EC_DB_FAIL => 15,
	EC_DB_DUPLICATE => 16,
	EC_COMMAND_FAIL => 21,
	EC_TIMEOUT => 99,

	# connect count
	MAX_CONNECT_COUNT => 3
};

my $timeout = 30;
my $root_prompt = '[#] $';

my $host = "localhost";
my $port = 22;

my $account_id = "";
my $account = "";
my $passwd = "";
my $conn;
my $is_run_passwd = "";

#my $db_host = "192.168.23.100";
my $db_host = "127.0.0.1";
my $db_account = "inems";
my $db_passwd = "inems";

my ($sec, $min, $hour, $mday, $mon, $year, $wday, $yday, $isdst) = localtime;
my $log_postfix = sprintf("./log/%04d%02d%02d", $year + 1900, $mon + 1, $mday)."_autoSSHPasswd.log";

open(STDOUT, '>', sprintf("./log/%04d%02d%02d", $year + 1900, $mon + 1, $mday)."_autoSSHPasswd_stdout.log") or die "Can't open log";
open(STDERR, '>', sprintf("./log/%04d%02d%02d", $year + 1900, $mon + 1, $mday)."_autoSSHPasswd_stderr.log") or die "Can't open log";

my @cmd = qw( sudo expect_mkpasswd -l 9 -s 0 );
my ($stdout, $stderr, $exit ) = capture {
	system @cmd;
	};

&main();

sub main {
	my $exp = new Expect;
	my $is_error = "0";
	my $result_code = EC_SUCCESS;

	$exp->raw_pty(0);	 			# pty raw mode
	$exp->log_stdout(1);		# Defaults to 1 for spawned commands. 0 for file handles attached with exp_init()
	$exp->exp_internal(1);	# or 2, 3 for more verbose output

	&init();

	&connect_server($exp);
	$exp->log_file($log_postfix);

	if($is_run_passwd) {
		print "Run expect_autopasswd";
		&command_run($exp);
		&update_server_password($stdout, $result_code);
	} else {
		$result_code = EC_ALIVE_SSH;
	}

	&update_server_health($result_code);
	&exit_proc("Completed all tasks successfully", EC_SUCCESS, 1, $exp);
}

sub init {

	if ( $#ARGV < 1 ) {
		&exit_proc("Not enough arguments. Please check it again", EC_ARG_ERROR, 0, undef);
	}
	
	for(my $i = 0; $i < $#ARGV; $i++) {
		switch($ARGV[$i]) {
			case "-id" { $account_id = $ARGV[++$i]; } 			# Target account id
			case "-h" { $host = $ARGV[++$i]; } 					# Target address
			case "-u" { $account = $ARGV[++$i]; }				# Connection account
			case "-p" { $passwd = $ARGV[++$i]; }				# Connection accoucnt password
			case "-P" { $port = $ARGV[++$i]; }					# Connect port number
			case "-C" { $is_run_passwd = "ture";}				# Is run command : autopasswd
		}
	}

	print "HOST : $host\n";
	print "PORT : $port\n";
	print "Connection account : $account\n";
	print "Connection account password : $passwd\n";
	print "Is Run command : $is_run_passwd\n";
	return;

}

sub exit_proc {

	my ($msg, $code, $do_release, $sub) = @_;

	# if do_release is not 0 and defined succeed, exit program with message
	if($do_release && defined($sub)) {
		$sub->send("exit\n");
		$sub->soft_close();
	}

	printf "Exit Message = $msg\nExit Code = $code\nBye.\n";
	exit $code;
}

sub timeout_err {
	print "Time out............\n";
	&update_server_health(EC_TIMEOUT);
	&exit_proc("Given execution time exceeded", EC_TIMEOUT, 0, undef);
	return;
}

sub connect_server {

	my $exp = shift;
	my $connect_count = 0;

	$conn = "ssh ".$account."@".$host." -p ".$port; 
	$exp->spawn($conn);
	$exp->expect($timeout,
		[qr "sername: " => sub { my $sub = shift; $sub->send("$account\n"); exp_continue; } ],
		[qr "ssword: " => sub { 
			my $sub = shift; 
			$sub->send("$passwd\n"); 

			$connect_count = $connect_count +1; 
			if( $connect_count > MAX_CONNECT_COUNT ) {
				&update_server_health(EC_SVR_WRNG_ACCOUNT);
				&exit_proc("Failed to login", EC_SVR_WRNG_ACCOUNT, 0, undef);
			}
			exp_continue; 
		}],
		[qr "yes/no" => sub { my $sub = shift; $sub->send("yes\n"); exp_continue; }],
		[qr "[y]:" => sub { my $sub = shift; printf "???\n"; $sub->send("y\n"); exp_continue; }],
		[qr "ermission denied|onnection refused" => sub { 
			&update_server_health(EC_SVR_WRNG_ACCOUNT); 
			&exit_proc("Failed to login", EC_SVR_WRNG_ACCOUNT, 0, undef); 
		}],
		[qr "ogin incorrect|onnection closed" => sub { 
				&update_server_health(EC_SVR_WRNG_ACCOUNT);
				&exit_proc("Failed to login", EC_SVR_WRNG_ACCOUNT, 0, undef);
		}],
		[qr "o route to host" => sub { 
				&update_server_health(EC_CONN_FAILED);
				&exit_proc("No route to host", EC_CONN_FAILED, 0, undef);
		}],
		[qr "emporarily unavailable" => sub {
				&update_server_health(EC_CONN_FAILED);
				&exit_proc("No response host", EC_CONN_FAILED, 0, undef);
		}],
		[timeout => \&timeout_err],
		"-re", qr"[#>\$\]]\s?(\e\[\d*;?\d*m){0,1}\s?$");

	return;
}

sub command_run {

	my ($exp) = @_;
	
	$passwd = $stdout;
	$exp->send("sudo expect_autopasswd inems $passwd");
	sleep(1);
	$exp->log_file();
	$exp->expect(2, [qr "--More--"  => sub{
										$exp->send(" "); 
										exp_continue;
									}],
							"-re", qr "$root_prompt");

	sleep(1);

	return EC_SUCCESS;
}

sub update_server_health {

	my $code = shift;

	# MySQL database configurations
	my $dsn = "DBI:mysql:inems;host=$db_host";
 
	# connect to MySQL database
	my %attr = ( PrintError=>0, RaiseError=>1);
	my $dbh = DBI->connect($dsn,$db_account,$db_passwd, \%attr);
 
	# update statement
	my $sql = "UPDATE tb_account SET health = ?, update_date=now() WHERE id = ?";
	my $sth = $dbh->prepare($sql);
	$sth->bind_param(1,$code);
 	$sth->bind_param(2,$account_id);

	# execute the query
	my $rows_changed = $sth->execute();

	if($sth->errstr) {
		print $sth->errstr."\n";
		$code = EC_DB_ERROR;
	}

	if( $rows_changed < 1) {
		print "Database update fail - Not updated\n";
		$code = EC_DB_FAIL;
	} elsif( $rows_changed > 1) {
		print "Database update fail - Duplicate data\n";
		$code = EC_DB_DUPLICATE;
	} else {
		print "Database update success\n";
	}
 
	$sth->finish();
 
	# disconnect from the MySQL database
	$dbh->disconnect();
}

sub update_server_password {

	my $new_passwd = shift;
	my $code = shift;

	# MySQL database configurations
	my $dsn = "DBI:mysql:inems;host=$db_host";
 
	# connect to MySQL database
	my %attr = ( PrintError=>0, RaiseError=>1);
	my $dbh = DBI->connect($dsn,$db_account,$db_passwd, \%attr);
 
	# update statement
	my $sql = "UPDATE tb_account SET server_password = ?, update_date=now(), server_password_update_date=now() WHERE id = ?";
	my $sth = $dbh->prepare($sql);
	$sth->bind_param(1,$new_passwd);
 	$sth->bind_param(2,$account_id);

	# execute the query
	my $rows_changed = $sth->execute();

	if($sth->errstr) {
		print $sth->errstr."\n";
	}

	if( $rows_changed < 1) {
		print "Database update fail - Not updated\n";
		$code = EC_DB_FAIL;
	} elsif( $rows_changed > 1) {
		print "Database update fail - Duplicate data\n";
		$code = EC_DB_DUPLICATE;
	} else {
		print "Database update success\n";
	}
 
	$sth->finish();
 
	# disconnect from the MySQL database
	$dbh->disconnect();
}



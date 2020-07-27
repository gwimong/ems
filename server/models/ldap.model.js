class LdapModel {
  constructor(p, uid) {
    this.cn = p.email;
    this.sn = p.email;
    this.displayName = p.email;
    this.userPassword = p.userPassword;
    this.givenName = p.email;
    this.mail = p.email;
    this.gidNumber = 500;
    this.homeDirectory = "/home/users/";
    this.loginShell = "/bin/bash";
    this.mobile = "000-0000-0000";
    this.objectClass = ["inetOrgPerson", "posixAccount"];
    this.uidNumber = uid * 1 + 5000;
    this.uid = p.email;
    this.employeeType = 1;
  }
}

module.exports = LdapModel

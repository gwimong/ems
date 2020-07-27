CREATE TABLE `tb_licensed_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `logoImage` longtext DEFAULT NULL,
  `info_url` varchar(200) DEFAULT NULL,
  `download_url` varchar(200) DEFAULT NULL,
  `create_date` varchar(20) DEFAULT NULL,
  `update_date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


create view inems.view_pc as select * from inproduct.tb_pc;
create view inems.view_pc_history as select * from inproduct.tb_pc_history;
create view inems.view_product as select * from inproduct.tb_product;
create view inems.view_inspace_product as select * from inproduct.tb_inspace_product;

CREATE TABLE `tb_server` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `used` tinyint(1) NOT NULL DEFAULT 1,
  `health` int(11) NOT NULL,
  `server_name` varchar(100) DEFAULT NULL COMMENT '서버명',
  `server_ip` varchar(100) DEFAULT NULL,
  `purpose` varchar(100) DEFAULT NULL,
  `owner` varchar(100) NOT NULL,
  `device_div` int(11) NOT NULL DEFAULT 0,
  `device_manufacturer` int(11) NOT NULL DEFAULT 0,
  `device_model` varchar(100) DEFAULT NULL,
  `device_type` int(11) NOT NULL DEFAULT 0,
  `device_location` varchar(100) DEFAULT NULL,
  `device_size` int(11) DEFAULT NULL,
  `storage` varchar(100) DEFAULT NULL,
  `memory` varchar(100) DEFAULT NULL,
  `gpu` varchar(100) DEFAULT NULL,
  `ipmi_ip` varchar(100) DEFAULT NULL,
  `ipmi_account` varchar(100) DEFAULT NULL,
  `ipmi_password` varchar(100) DEFAULT NULL,
  `os_type` int(11) NOT NULL,
  `os_name` int(11) NOT NULL,
  `comment` varchar(100) DEFAULT NULL,
  `create_date` varchar(100) DEFAULT NULL,
  `update_date` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tb_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `server_id` int(11) DEFAULT NULL COMMENT 'tb_server ID',
  `health` int(11) NOT NULL,
  `server_account` varchar(100) DEFAULT NULL,
  `server_password` varchar(100) DEFAULT NULL,
  `server_password_update_date` varchar(100) DEFAULT NULL,
  `comment` varchar(100) DEFAULT NULL,
  `create_date` varchar(100) DEFAULT NULL,
  `update_date` varchar(100) DEFAULT NULL,
  `use_ssh` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL COMMENT 'cn',
  `is_notifications_email` tinyint(1) NOT NULL DEFAULT 1,
  `is_notifications_push` tinyint(1) NOT NULL DEFAULT 1,
  `is_messages_email` tinyint(1) NOT NULL DEFAULT 1,
  `is_messages_push` tinyint(1) NOT NULL DEFAULT 1,
  `create_date` varchar(100) DEFAULT NULL,
  `update_date` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
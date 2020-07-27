class ServerModel {
  constructor(p) {
    this.id = p.id;
    this.used = p.used;
    this.health = p.health;
    this.use_ssh = p.use_ssh;
    this.use_ping = p.use_ping;
    this.server_name = p.server_name;
    this.owner = p.owner
    this.device_div = p.device_div;
    this.device_manufacturer = p.device_manufacturer;
    this.device_model = p.device_model;
    this.device_type = p.device_type;
    this.device_location = p.device_location;
    this.device_size = p.device_size;
    this.storage = p.storage;
    this.memory = p.memory;
    this.gpu = p.gpu;
    this.ipmi_ip = p.ipmi_ip;
    this.ipmi_account  = p.ipmi_account;
    this.ipmi_password = p.ipmi_password;
    this.os_type = p.os_type;
    this.os_name = p.os_name;
    this.purpose = p.purpose;
    this.server_ip = p.server_ip;
    this.server_account = p.server_account;
    this.server_password = p.server_password;
    this.server_password_update_date = p.server_password_update_date;
    this.comment = p.comment;
    this.create_date = p.create_date;
    this.update_date = p.update_date;
  }
}

module.exports = ServerModel

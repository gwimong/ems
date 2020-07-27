class ServerModel {
  constructor(p) {
    this.id = p.id;
    this.health = p.health;
    this.use_ssh = p.use_ssh;
    this.server_id = p.server_id;
    this.server_name = p.server_name;
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

class UserModel {
  constructor(p) {
    this.name = p.sn;
    this.is_notifications_email = p.is_notifications_email;
    this.is_notifications_push = p.is_notifications_push;
    this.is_messages_email = p.is_messages_email;
    this.is_messages_push = p.is_messages_push;
    this.photo_base64 = p.photo_base64;
  }
}

module.exports = UserModel

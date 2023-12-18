module.exports.Client = class Client {
  constructor({
    id = null,
    cin = null,
    first_name = null,
    last_name = null,
    email = null,
    phone = null,
    user = null,
  }) {
    this.id = id;
    this.cin = cin;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.user = user;
  }
};

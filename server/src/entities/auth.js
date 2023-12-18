module.exports.Auth = class Auth {
  constructor({
    first_name = null,
    last_name = null,
    email = null,
    password = null,
  }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }
};

const genders = {
  NOT_SPECIFIED: 0,
  FEMALE: 1,
  MALE: 2,
};

module.exports.userConstants = {
  genders,
};

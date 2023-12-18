module.exports.Response = class Response {
  constructor({ status = null, message = null, data = null, errors = null }) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }
};

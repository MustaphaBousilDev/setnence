const addAuthController = require("./addAuth.controller");
const getAuthByEmailController = require("./getAuthByEmail.controller");

module.exports = () => {
  return {
    addAuthController,
    getAuthByEmailController,
  };
};

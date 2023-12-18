const { Auth, userConstants } = require("./auth");
const { Client } = require("./client");
const { Appartement } = require("./appartement");
const { Paiement } = require("./paiement");

module.exports = {
  Auth,
  constants: {
    userConstants,
  },
  Client,
  Appartement,
  Paiement,
};

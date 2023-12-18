const express = require("express");
const authRouter = require("./auth");
const appartementRouter = require("./appartement");
const clientRouter = require("./client");
const paiementRouter = require("./paiement");

module.exports = (app) => {
  const routes = express.Router();
  routes.use("/auth", authRouter());
  routes.use("/appartement", appartementRouter());
  routes.use("/client", clientRouter());
  routes.use("/paiement", paiementRouter());

  return routes;
};

const express = require("express");
const { authController } = require("../../../controllers");

module.exports = (ded) => {
  const router = express.Router();

  const { addAuthController, getAuthByEmailController } = authController(ded);

  router.post("/register", addAuthController);

  router.post("/login", getAuthByEmailController);

  return router;
};

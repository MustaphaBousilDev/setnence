const express = require("express");
const { clientController } = require("../../../controllers");

module.exports = (ded) => {
  const router = express.Router();

  const {
    addClientController,
    getAllClientController,
    deleteClientController,
    updateClientController,
  } = clientController(ded);

  router
    .route("/")
    .get(getAllClientController)
    .post(addClientController)
    .delete(deleteClientController)
    .patch(updateClientController);

  return router;
};

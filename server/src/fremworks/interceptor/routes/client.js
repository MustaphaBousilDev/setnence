const express = require("express");
const { clientController } = require("../../../controllers");
const { isAuthenticated, isSyndicale } = require("../middleware/auth");

module.exports = (ded) => {
  const router = express.Router();

  const {
    addClientController,
    getAllClientController,
    deleteClientController,
    updateClientController,
  } = clientController(ded);

  router
    .route("/:token?")
    .get(isAuthenticated,getAllClientController)
    .post(isAuthenticated,addClientController)
    .delete(isAuthenticated,deleteClientController)
    .patch(isAuthenticated,updateClientController);

  return router;
};

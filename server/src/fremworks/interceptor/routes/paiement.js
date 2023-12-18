const express = require("express");
const { paiementController } = require("../../../controllers");

module.exports = (ded) => {
  const router = express.Router();

  const {
    addPaiementController,
    getAllPaiementController,
    deletePaiementController,
    updatePaiementController,
  } = paiementController(ded);

  router
    .route("/")
    .post(addPaiementController)
    .get(getAllPaiementController)
    .delete(deletePaiementController)
    .patch(updatePaiementController);

  return router;
};

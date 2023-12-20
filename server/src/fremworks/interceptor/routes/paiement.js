const express = require("express");
const { paiementController } = require("../../../controllers");
const { isAuthenticated, isSyndicale } = require("../middleware/auth");
module.exports = (ded) => {
  const router = express.Router();

  const {
    addPaiementController,
    getAllPaiementController,
    deletePaiementController,
    updatePaiementController,
    getPaiementController

  } = paiementController(ded);

  router
    .route("/:token?")
    .post(isAuthenticated,addPaiementController)
    .get(isAuthenticated,getAllPaiementController)
    .delete(isAuthenticated,deletePaiementController)
    .patch(isAuthenticated,updatePaiementController);

    router.route("/:token?/:id").get(isAuthenticated,getPaiementController);

  return router;
};

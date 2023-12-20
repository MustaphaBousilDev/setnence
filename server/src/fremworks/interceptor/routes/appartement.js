const express = require("express");
const { appartementController } = require("../../../controllers");
const { isAuthenticated, isSyndicale } = require("../middleware/auth");

module.exports = (ded) => {
  const router = express.Router();

  const {
    addAppartementController,
    getAllAppartementController,
    getAppartementController,
    deleteAppartementController,
    updateAppartementController,
    getAppartementByStatusController,
  } = appartementController(ded);

  router
    .route("/:token?")
    .post(isAuthenticated, addAppartementController)
    .get(isAuthenticated,getAllAppartementController)
    .delete(isAuthenticated, deleteAppartementController)
    .patch(isAuthenticated, updateAppartementController);
  router.route("/status").get(getAppartementByStatusController);

  router.route("/:token?/:id").get(isAuthenticated,getAppartementController);

  return router;
};

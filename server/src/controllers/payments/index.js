const addPaiementController = require("./addPaiement.controller");
const getAllPaiementController = require("./getAllPaiment.controller");
const deletePaiementController = require("./deletePaiement.controller");
const updatePaiementController = require("./updatePaiement.controller");

module.exports = () => {
  return {
    addPaiementController,
    getAllPaiementController,
    deletePaiementController,
    updatePaiementController,
  };
};

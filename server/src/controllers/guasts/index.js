const addClientController = require("./addClient.controller");
const getAllClientController = require("./getAllClient.controller");
const deleteClientController = require("./deleteClient.controller");
const updateClientController = require("./updateClient.controller");

module.exports = () => {
  return {
    addClientController,
    getAllClientController,
    deleteClientController,
    updateClientController,
  };
};

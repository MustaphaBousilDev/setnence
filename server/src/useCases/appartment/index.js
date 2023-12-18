const addAppartementUseCase = require("./addAppartement.useCase");
const getAllAppartementUseCase = require("./getAllAppartement.useCase");
const getAppartementUseCase = require("./getAppartement.useCase");
const updateAppartementUseCase = require("./updateAppartement.useCase");
const deleteAppartementUseCase = require("./deleteAppartement.useCase");
const updateStatusAppartementUseCase = require("./updateStatusAppartement.useCase");
const getAppartementByStatus = require("./getAppartementByStatus.useCase");

module.exports = {
  addAppartementUseCase,
  getAllAppartementUseCase,
  getAppartementUseCase,
  updateAppartementUseCase,
  deleteAppartementUseCase,
  updateStatusAppartementUseCase,
  getAppartementByStatus,
};

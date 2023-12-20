const { Response } = require("../../fremworks/shared/response");
const {
  paiementRepository,
} = require("../../fremworks/repository/mongo");

module.exports = () => {
  if (!paiementRepository) {
    throw new Error(
      "The appartement repository should be exist in dependancies"
    );
  }
  const execute = async (id) => {
    const response = await paiementRepository.getById(id);

    return response;
  };
  return { execute };
};

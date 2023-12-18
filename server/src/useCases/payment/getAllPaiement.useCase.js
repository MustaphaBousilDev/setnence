const { paiementRepository } = require("../../fremworks/repository/mongo");

module.exports = () => {
  if (!paiementRepository) {
    throw new Error(
      "The appartement repository should be exist in dependancies"
    );
  }
  const execute = async () => {
    const response = await paiementRepository.getAll();

    return response;
  };
  return { execute };
};

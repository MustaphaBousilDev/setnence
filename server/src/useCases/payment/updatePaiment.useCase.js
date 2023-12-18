const { paiementRepository } = require("../../fremworks/repository/mongo");

module.exports = () => {
  if (!paiementRepository) {
    throw new Error("The paiement repository should be exist in dependancies");
  }
  const execute = async (paiement) => {
    const response = await paiementRepository.update(paiement);

    return response;
  };
  return { execute };
};

const { Request } = require("../../config/request");
const { Paiement } = require("../../entities");
const { paiementRepository } = require("../../fremworks/repository/mongo");

module.exports = () => {
  if (!paiementRepository) {
    throw new Error("The paiement repository should be exist in dependancies");
  }
  const execute = async (appartement, client, datePaiement, montant, user) => {
    const paiement = new Paiement({
      appartement,
      client,
      datePaiement,
      montant,
      user,
    });

    const request = new Request();
    const validation = request.paiement().validate(paiement);

    if (validation.error) {
      throw new Error(validation.error.message);
    }

    const response = await paiementRepository.add(paiement);
    return response;
  };
  return { execute };
};

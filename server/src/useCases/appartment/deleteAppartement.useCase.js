const { Appartemant } = require("../../entities/appartement");
const { Response } = require("../../fremworks/shared/response");

const {
  appartementRepository,
} = require("../../fremworks/repository/mongo");

module.exports = () => {
  if (!appartementRepository) {
    throw new Error(
      "The appartement repository should be exist in dependancies"
    );
  }
  const execute = async (id) => {
    const appartement = new Appartemant({
      id,
    });

    const response = await appartementRepository.delete(appartement);

    return response;
  };
  return { execute };
};

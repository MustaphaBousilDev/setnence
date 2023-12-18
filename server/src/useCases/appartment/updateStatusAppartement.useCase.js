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
  const execute = async (appartement) => {
    const response = await appartementRepository.updateStatus(appartement);

    return response;
  };
  return { execute };
};

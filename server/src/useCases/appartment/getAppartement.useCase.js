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
    const response = await appartementRepository.getById(id);

    return response;
  };
  return { execute };
};

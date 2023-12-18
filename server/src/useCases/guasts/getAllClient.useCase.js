const { Response } = require("../../fremworks/shared/response");
const { clientRepository } = require("../../fremworks/repository/mongo");

module.exports = () => {
  if (!clientRepository) {
    throw new Error(
      "The appartement repository should be exist in dependancies"
    );
  }
  const execute = async () => {
    const response = await clientRepository.getAll();

    return response;
  };
  return { execute };
};

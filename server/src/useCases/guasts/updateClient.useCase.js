const { clientRepository } = require("../../fremworks/repository/mongo");

module.exports = () => {
  if (!clientRepository) {
    throw new Error(
      "The client repository should be exist in dependancies"
    );
  }
  const execute = async (client) => {
    const response = await clientRepository.update(client);

    return response;
  };
  return { execute };
};

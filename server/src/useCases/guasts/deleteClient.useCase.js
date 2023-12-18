const { Client } = require("../../entities/client");

const { clientRepository } = require("../../fremworks/repository/mongo");

module.exports = () => {
  if (!clientRepository) {
    throw new Error("The client repository should be exist in dependancies");
  }
  const execute = async (id) => {
    const client = new Client({
      id,
    });

    const response = await clientRepository.delete(client);

    return response;
  };
  return { execute };
};

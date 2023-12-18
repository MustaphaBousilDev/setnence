const { Request } = require("../../config/request");
const { Client } = require("../../entities/client");
const { clientRepository } = require("../../fremworks/repository/mongo");

module.exports = () => {
  if (!clientRepository) {
    throw new Error(
      "The appartement repository should be exist in dependancies"
    );
  }
  const execute = async (cin, first_name, last_name, email, phone, user) => {
    const client = new Client({
      cin,
      first_name,
      last_name,
      email,
      phone,
      user,
    });

    const request = new Request();
    const validation = request.client().validate(client);

    if (validation.error) {
      throw new Error(validation.error.message);
    }

    const response = await clientRepository.add(client);
    return response;
  };
  return { execute };
};

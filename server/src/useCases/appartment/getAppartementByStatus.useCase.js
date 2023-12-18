const {
  appartementRepository,
} = require("../../fremworks/repository/mongo");

module.exports = () => {
  if (!appartementRepository) {
    throw new Error(
      "The appartement repository should be exist in dependancies"
    );
  }
  const execute = async () => {
    const response = await appartementRepository.getByStatus();

    return response;
  };
  return { execute };
};

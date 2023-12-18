const { Response } = require("../../fremworks/shared/response");
const { getAppartementByStatus } = require("../../useCases/appartment");

module.exports = async (req, res) => {
    console.log(123);
  try {
    const useCaseInstance = getAppartementByStatus();
    const response = await useCaseInstance.execute();

    if (!response) {
      return res.json(
        new Response({
          status: 404,
          message: "Appartement not found",
          data: {},
        })
      );
    }

    return res.json(
      new Response({
        status: 200,
        message: "Appartement found successfully",
        data: response,
      })
    );
  } catch (err) {
    res.json(
      new Response({
        status: 500,
        message: err.message,
        data: {},
      })
    );
  }
};

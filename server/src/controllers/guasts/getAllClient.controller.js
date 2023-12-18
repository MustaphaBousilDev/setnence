const { Response } = require("../../fremworks/shared/response");
const { getAllClientUseCase } = require("../../useCases/guasts");

module.exports = async (req, res) => {
  try {
    const useCaseInstance = getAllClientUseCase();
    const response = await useCaseInstance.execute();

    if (!response) {
      return res.json(
        new Response({
          status: 404,
          message: "Client not found",
          data: {},
        })
      );
    }

    return res.json(
      new Response({
        status: 200,
        message: "Client found successfully",
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

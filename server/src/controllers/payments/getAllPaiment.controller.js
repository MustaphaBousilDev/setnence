const { Response } = require("../../fremworks/shared/response");
const { getAllPaiementUseCase } = require("../../useCases/payment");

module.exports = async (req, res) => {
  try {
    const useCaseInstance = getAllPaiementUseCase();
    const response = await useCaseInstance.execute();

    if (!response) {
      return res.json(
        new Response({
          status: 404,
          message: "Paiement not found",
          data: {},
        })
      );
    }

    return res.json(
      new Response({
        status: 200,
        message: "Paiement found successfully",
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

const { Response } = require("../../fremworks/shared/response");
const { deletePaiementUseCase } = require("../../useCases/payment");

module.exports = async (req, res) => {
  try {
    const { id } = req.body;
    const useCaseInstance = deletePaiementUseCase();
    const response = await useCaseInstance.execute(id);

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
        message: "Paiement deleted successfully",
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

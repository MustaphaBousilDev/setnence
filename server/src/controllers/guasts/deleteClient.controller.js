const { Response } = require("../../fremworks/shared/response");
const { deleteClientUseCase } = require("../../useCases/guasts");

module.exports = async (req, res) => {
  try {
    const { id } = req.body;
    const useCaseInstance = deleteClientUseCase();
    const response = await useCaseInstance.execute(id);

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
        message: "Client deleted successfully",
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

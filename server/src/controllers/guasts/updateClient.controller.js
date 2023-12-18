const { Response } = require("../../fremworks/shared/response");

const { updateClientUseCase } = require("../../useCases/guasts");
module.exports = async (req, res) => {
  try {
    const { _id, ...updates } = req.body;
    const updateCategory = updateClientUseCase();
    const response = await updateCategory.execute({
      _id,
      updates,
    });

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
        message: "update Client successfully",
        data: response,
      })
    );
  } catch (err) {
    return res.json(
      new Response({
        status: 500,
        message: err.message,
        data: {},
      })
    );
  }
};

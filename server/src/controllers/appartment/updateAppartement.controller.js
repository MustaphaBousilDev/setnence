const { Response } = require("../../fremworks/shared/response");

const { updateAppartementUseCase } = require("../../useCases/appartment");
module.exports = async (req, res) => {
  try {
    const { _id, ...updates } = req.body;
    const updateCategory = updateAppartementUseCase();
    const response = await updateCategory.execute({
      _id,
      updates,
    });

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
        message: "update Appartement successfully",
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

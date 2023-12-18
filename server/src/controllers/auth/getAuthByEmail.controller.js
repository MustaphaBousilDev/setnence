const { Response } = require("../../fremworks/shared/response");
const { getAuthByEmailUseCase } = require("../../useCases/auth");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const useCaseInstance = getAuthByEmailUseCase();
    const response = await useCaseInstance.execute(email, password);

    if (!response) {
      return res.status(400).json(
        new Response({
          status: 400,
          message: "User not found",
          data: response,
        })
      );
    }

    await res.cookie("_cks_ui", response.data.token, {
      secure: true,
    });

    return res.status(201).json(
      new Response({
        status: 201,
        message: "User added successfully",
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

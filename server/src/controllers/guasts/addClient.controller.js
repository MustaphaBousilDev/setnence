const { Response } = require("../../fremworks/shared/response");
const { addClientUseCase } = require("../../useCases/guasts");

module.exports = async (req, res) => {
  try {
    const { cin, first_name, last_name, email, phone, user } = req.body;

    const useCaseInstance = addClientUseCase();
    const response = await useCaseInstance.execute(
      cin,
      first_name,
      last_name,
      email,
      phone,
      user
    );

    return res.status(201).json(
      new Response({
        status: 200,
        message: "Client added successfully",
        data: response,
      })
    );
  } catch (err) {
    return res.status(400).json(
      new Response({
        status: 400,
        message: err.message,
        data: {},
      })
    );
  }
};

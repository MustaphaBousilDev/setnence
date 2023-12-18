const { Response } = require("../../fremworks/shared/response");
const { addAuthUseCase } = require("../../useCases/auth");

module.exports = async (req, res) => {
  try {
    console.log('req body')
    console.log(req.body)
    const { email, password, first_name, last_name } = req.body;

    const useCaseInstance = addAuthUseCase();
    const response = await useCaseInstance.execute(
      first_name,
      last_name,
      email,
      password
    );

    return res.status(201).json(
      new Response({
        status: 200,
        message: "User added successfully",
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

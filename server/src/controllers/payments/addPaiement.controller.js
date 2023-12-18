const { Response } = require("../../fremworks/shared/response");
const { addPaiementUseCase } = require("../../useCases/payment");
const {
  updateStatusAppartementUseCase,
} = require("../../useCases/appartment");

module.exports = async (req, res) => {
  try {
    const { appartement, client, datePaiement, montant, user } = req.body;

    const useCaseInstanceUpdate = updateStatusAppartementUseCase();
    const responseUpdate = await useCaseInstanceUpdate.execute({
      _id: appartement,
      status: true,
    });

    if (!responseUpdate) {
      throw new Error("Appartement not found");
    }
    const useCaseInstance = addPaiementUseCase();
    const response = await useCaseInstance.execute(
      appartement,
      client,
      datePaiement,
      montant,
      user
    );

    return res.status(201).json(
      new Response({
        status: 200,
        message: "Paiement added successfully",
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

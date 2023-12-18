const mongoose = require("mongoose");
const entityName = "Paiement";

const {
  schemas: { paiement: paiementSchema },
} = require("../../database/mongo");

const repository = () => {
  const Paiement = mongoose.model(entityName, paiementSchema);
  return {
    add: async (paiement) => {
      console.log(paiement);
      const mongoObject = new Paiement(paiement);
      return mongoObject.save();
    },
    update: async (paiement) => {
      const { _id, updates } = paiement;
      const _paiement = Paiement.findByIdAndUpdate(
        _id,
        {
          ...updates,
          updatedAt: new Date(),
        },
        {
          new: true,
        }
      );

      return _paiement;
    },
    delete: async (paiement) => {
      const { id } = paiement;
      const _paiement = await Paiement.findByIdAndDelete(
        id,
        {
          deletedAt: new Date(),
        },
        {
          new: true,
        }
      );

      return _paiement;
    },
    getById: async (id) => {
      const paiement = await Paiement.findOne({
        _id: id,
        deletedAt: {
          $exists: false,
        },
      });
      return paiement;
    },
    getAll: async () => {
      const paiement = await Paiement.find()
        .populate("appartement")
        .populate("client");

      return paiement;
    },
  };
};

module.exports = repository();

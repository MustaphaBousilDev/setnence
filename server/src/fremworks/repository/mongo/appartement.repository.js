const mongoose = require("mongoose");
const entityName = "Appartement";

const {
  schemas: { appartement: appartementSchema },
} = require("../../database/mongo");

const repository = () => {
  const Appartement = mongoose.model(entityName, appartementSchema);
  return {
    add: async (appartement) => {
      const mongoObject = new Appartement(appartement);
      return mongoObject.save();
    },
    update: async (appartement) => {
      const { _id, updates } = appartement;
      const _appartement = Appartement.findByIdAndUpdate(
        _id,
        {
          ...updates,
          updatedAt: new Date(),
        },
        {
          new: true,
        }
      );

      return _appartement;
    },
    delete: async (appartement) => {
      const { id } = appartement;
      const _appartement = await Appartement.findByIdAndDelete(
        id,
        {
          deletedAt: new Date(),
        },
        {
          new: true,
        }
      );

      return _appartement;
    },
    getById: async (id) => {
      const appartement = await Appartement.findOne({
        _id: id,
        deletedAt: {
          $exists: false,
        },
      });
      return appartement;
    },
    getAll: async () => {
      const appartement = await Appartement.find();

      return appartement;
    },
    updateStatus: async (appartement) => {
      const { _id, status } = appartement;

      const _appartement = Appartement.findByIdAndUpdate(
        _id,
        {
          status: status,
          updatedAt: new Date(),
        },
        {
          new: true,
        }
      );

      return _appartement;
    },
    getByStatus: async () => {
      const appartement = await Appartement.find({ status: false });

      return appartement;
    },
  };
};

module.exports = repository();

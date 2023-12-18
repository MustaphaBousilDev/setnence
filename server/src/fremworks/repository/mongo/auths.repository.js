const mongoose = require("mongoose");
const entityName = "Persone";

const {
  schemas: { user: authSchema },
} = require("../../database/mongo");

const repository = () => {
  const User = mongoose.model(entityName, authSchema);
  return {
    add: async (user) => {
      console.log('ttttt')
      const mongoObject = new User(user);
      console.log('repository ')
      console.log(mongoObject)
      return mongoObject.save();
    },
    update: async (user) => {
      const { id, updates } = user;
      delete user.id;
      return User.findByIdAndUpdate(
        id,
        {
          ...updates,
          updatedAt: new Date(),
        },
        {
          new: true,
        }
      );
    },
    delete: async (user) => {
      const { id } = user;
      delete user.id;
      return User.findByIdAndUpdate(
        id,
        {
          deletedAt: new Date(),
        },
        {
          new: true,
        }
      );
    },
    getById: async (id) => {
      const user = await User.findOne({
        _id: id,
        deletedAt: {
          $exists: false,
        },
      });
      if (!user) {
        throw new Error(
          `User with ID ${id} does not exist or has been deleted.`
        );
      }
      return user;
    },
    getByEmail: async (user) => {
      const { email } = user;
      const _User = await User.findOne({
        email: email,
      });

      return _User;
    },
  };
};

module.exports = repository();

const { default: mongoose } = require("mongoose");
const schemas = require("./models");
require("dotenv").config();
module.exports = {
  connect: () => {
    mongoose
      .connect(process.env.CONNECTION_MONGO, {
        useNewUrlParser: true,
      })
      .then(() => console.log("DB Connected Successfully✅"))
      .catch((err) => {
        console.log("error connectly to mongodb", err);
        process.exit(1);
      });
  },
  schemas,
};

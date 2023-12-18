const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = 4000;
const { connect: connectMongo } = require("./fremworks/database/mongo");
const routes = require("./fremworks/interceptor/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const allowedOrigins = ["http://localhost:5174"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = {
  start: () => {
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors(corsOptions));
    const apiRoutes = routes();
    app.use("/api/v1", apiRoutes);
    app.use(bodyParser.json());

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      connectMongo();
    });
  },
};

const mongoose = require("mongoose");
const config = require("config");
const { APIError } = require("../middlewares/error-handler");
const databaseURI = config.get("databaseURI");

const connectDB = async () => {
  try {
    await mongoose.connect(databaseURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("✅ database is connected");
  } catch (err) {
    console.log("🔴 Database failed to connect!");
    throw APIError();
  }
};

module.exports = connectDB;

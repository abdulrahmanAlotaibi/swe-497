const mongoose = require("mongoose");

const options = {
  discriminatorKey: "kind",
  collection: "users",
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      minlength: 6,
    },
    isBaned: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: [true, "User must have a role"],
    },
  },
  options
);

module.exports = User = mongoose.model("User", UserSchema);
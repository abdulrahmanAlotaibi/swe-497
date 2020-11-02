const mongoose = require("mongoose");
const User = require("./User");

const TutorSchema = new mongoose.Schema(
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
      default: "tutor",
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    qualifications: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: [true, "Tutor must have a phone number"],
    },
    city: {
      type: String,
      required: [true, "Tutor must mention the city"],
    },
    subscriptionValidity: {
      type: Boolean,
      default: false,
    },
    subscriptionExpiresIn: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = Tutor = mongoose.model("Tutor", TutorSchema);

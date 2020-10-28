const mongoose = require("mongoose");
const User = require("./User");

const TutorSchema = new mongoose.Schema(
  {
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

module.exports = Tutor = User.discriminator("Tutor", TutorSchema);

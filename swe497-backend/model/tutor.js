const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Course = require("./course");
const passwordCheck = require("../utilities/passwordCheck");

const tutorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tutor must have a name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Tutor must have an email"]
  },
  password: {
    type: String,
    required: [true, "Tutor must have a password"],
    validate: {
      validator: function(el) {
        return el.length >= 6;
      },
      message: "The password should be at least six charachters"
    }
  },
  confirmPassword: {
    type: String,
    required: [true, "Tutor must confirm the password entered"],
    validate: {
      validator: function(el) {
        return this.password === el;
      },
      message: "passwords are not matched"
    }
  },
  qualifications: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  phone: {
    type: String,
    required: [true, "Tutor must have a phone number"]
  },
  city: {
    type: String,
    required: [true, "Tutor must mention the city"]
  },
  isBaned: {
    type: Boolean,
    default: false
  },
  subscriptionValidity: {
    type: Boolean,
    default: false
  },
  subscriptionExpiresIn: {
    type: Date,
    default: Date.now()
  }
});

tutorSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

tutorSchema.methods.correctPassword = passwordCheck;

module.exports = mongoose.model("Tutor", tutorSchema);

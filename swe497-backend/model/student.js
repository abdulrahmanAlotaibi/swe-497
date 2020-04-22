const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Course = require("./course");
const passwordCheck = require("../utilities/passwordCheck");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student must have a username"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Student must have an email"]
  },
  password: {
    type: String,
    required: [true, "Student must have a password"],
    validate: {
      validator: function(el) {
        return el.length >= 6;
      },
      message: "The password should be at least six charachters"
    }
  },
  confirmPassword: {
    type: String,
    required: [true, "Student must confirm the password entered"],
    validate: {
      validator: function(el) {
        //works with SAVE and CREAT only
        return this.password === el;
      },
      message: "passwords are not matched"
    }
  },
  role: {
    type: String
  },
  courses: [String],
  cart: [String],
  isBaned: {
    type: Boolean,
    default: false
  }
});

studentSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

studentSchema.methods.correctPassword = passwordCheck;

module.exports = mongoose.model("Student", studentSchema);

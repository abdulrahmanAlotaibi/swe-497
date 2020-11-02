const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
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
    default: "student",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  educationLevel: {
    type: String,
  },
  studyAt: {
    type: String,
  },
});

module.exports = Student = mongoose.model("Student", StudentSchema);

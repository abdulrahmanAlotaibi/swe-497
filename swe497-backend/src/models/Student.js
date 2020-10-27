const mongoose = require("mongoose");
const User = require("./User");

const StudentSchema = new mongoose.Schema({
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
  currentEducationLevel: {
    type: String,
  },
  studyAt: {
    type: String,
  },
});

module.exports = Student = User.discriminator("Student", StudentSchema);

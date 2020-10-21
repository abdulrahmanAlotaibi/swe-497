const mongoose = require("mongoose");
const User = require("./User");

const StudentSchema = new mongoose.Schema({
  courses: [String],
  cart: [String],
});

module.exports = Student = User.discriminator("Student", StudentSchema);

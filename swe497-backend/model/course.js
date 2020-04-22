const mongoose = require("mongoose");
const validator = require("validator");
const Student = require("./student");
const Tutor = require("./tutor");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Course must have a name"]
  },
  type: {
    type: String,
    required: true
  },
  tutor: {
    type: String,
    required: [true, "Course must have a tutor"]
  },
  img: {
    type: String
  },
  students: [String],
  price: {
    type: Number,
    required: [true, "Course must have a price"]
  },
  rating: {
    type: Number,
    default: 0
  },
  // videos: [String],
  description: {
    type: String,
    required: [true, "Course must have a description"]
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  category: {
    type: String,
    required: [true, "Course mmust have a category"]
  },
  institution: {
    type: String,
    required: [true, "Course must have an institution name"]
  },
  schedule: [Object],
  chapters: [Object],
  isSuspended: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Course", courseSchema);

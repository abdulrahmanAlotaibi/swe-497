const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Course must have a name"],
  },
  tutor: {
    type: Schema.Types.ObjectId,
    ref: "Tutor",
  },
  img: {
    type: String,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  price: {
    type: Number,
    required: [true, "Course must have a price"],
  },
  rating: {
    type: Number,
    default: 0,
    max: 5,
  },
  description: {
    type: String,
    required: [true, "Course must have a description"],
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  // todo: Make seperate schema for it
  category: {
    type: String,
    required: [true, "Course must have a category"],
  },
  // todo: Make seperate schema for it
  institution: {
    type: String,
    required: [true, "Course must have an institution name"],
  },
  chapters: [Object],
  isSuspended: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Course", CourseSchema);

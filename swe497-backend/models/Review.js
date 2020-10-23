const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Review must belong to a course"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "The review must be written by a student"],
  },
  text: {
    type: String,
    required: [true, "The review must have a text content"],
  },
  rating: {
    type: Number,
    required: [true, "The review must include a rating"],
    min: 1,
  },
});

module.exports = mongoose.model("Review", reviewSchema);

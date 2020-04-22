const Course = require("./course");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Comment must have a text"]
  },
  author: {
    type: String,
    required: [true, "Comment must have an author"]
  },
  video: {
    type: String,
    required: [true, "Comment must have a video reference"]
  },
  createdAt: {
    type: String,
    required: [true, "Comment must have a started date"]
  },
  repliesId: [String],
  isRoot: {
    type: Boolean,
    required: [true, "Comment must be specefied if it is a root comment or not"]
  }
});

module.exports = mongoose.model("Comments", commentSchema);

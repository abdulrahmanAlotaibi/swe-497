const Course = require("./course");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: [true, "Comment must have an author"],
    },
    text: {
      type: String,
      required: [true, "Comment must have a text"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      path: "Course",
      required: [true, "Comment must have a course reference"],
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      path: "Video",
      required: [true, "Comment must have a video reference"],
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        path: "Comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", commentSchema);

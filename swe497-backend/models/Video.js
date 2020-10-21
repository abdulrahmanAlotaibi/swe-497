const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  // FIXME: change where to store the videos
  content: String,
});

module.exports = mongoose.model("Video", videoSchema);

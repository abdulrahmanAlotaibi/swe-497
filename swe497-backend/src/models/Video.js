const mongoose = require("mongoose");
// todo : add lecture schema
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Video", videoSchema);

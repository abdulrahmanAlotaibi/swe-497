const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  content: String,
  course: String
});

module.exports = mongoose.model("videos", videoSchema);

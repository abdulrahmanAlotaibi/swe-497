const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Article", ArticleSchema);


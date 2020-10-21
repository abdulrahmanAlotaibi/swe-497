const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
    enum: ["Video", "Article"],
  },
  content: [
    {
      type: Schema.Types.ObjectId,
      refPath: "contentType",
    },
  ],
});

// content ==> video 
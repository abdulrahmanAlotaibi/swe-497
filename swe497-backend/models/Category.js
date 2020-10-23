const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  mainCategory: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
});

module.exports = Category = mongoose.model("Category", CategorySchema);


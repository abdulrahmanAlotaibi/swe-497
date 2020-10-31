const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  mainCategory: {
    type: String,
    required: true,
    unique: true,
  },
  subCategory: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = Category = mongoose.model("Category", CategorySchema);

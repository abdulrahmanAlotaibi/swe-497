const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  total: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  taxRate: {
    type: Number,
    mi: 0,
  },
});

// CartSchema.virtual("")

module.exports = Cart = mongoose.model("Cart", CartSchema);

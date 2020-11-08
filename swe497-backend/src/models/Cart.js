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
  },
  taxRate: {
    type: Number,
  },
});


// CartSchema.virtual("")

module.exports = Cart = mongoose.model("Cart", CartSchema);

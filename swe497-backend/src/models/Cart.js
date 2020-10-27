const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  courses: [
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
module.exports = Cart = mongoose.model("Cart", CartSchema);

const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  // todo: Add TaxRate
});
module.exports = Cart = mongoose.model("Cart", CartSchema);

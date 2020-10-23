const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  itemType: {
    type: String,
    required: true,
    enum: ["Course", "Subscription"],
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      refPath: "contentType",
    },
  ],
});
module.exports = mongoose.model("Order", OrderSchema);

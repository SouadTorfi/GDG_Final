const { Schema, model } = require("mongoose");

const OrderStatusSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
  },
  {
    collection: "orderStatuses",
    timestamps: true,
  }
);

const OrderStatus = model("OrderStatus", OrderStatusSchema);
module.exports = OrderStatus;
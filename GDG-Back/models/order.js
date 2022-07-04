const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema(
  {
    client_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    currency_id: {
      type: Schema.Types.ObjectId,
      ref: "Currency",
    },
    product_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    status_id: {
      type: Schema.Types.ObjectId,
      ref: "OrderStatus",
    },
    payment_type: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { 
    collection:"orders",
    timestamps: true }
);

// OrderSchema.pre(["find", "findOne", "findById"], function () {
//   this.populate(["client_id", "currency_id", "product_id", "status_id"]);
// });
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
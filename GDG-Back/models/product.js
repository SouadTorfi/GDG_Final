const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },
    clothes: {
      type: String,
      required: true,
    },
    package: {
      type: String,
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required:true
    },
    Collection:{
      type:Schema.Types.ObjectId,
      ref:"collection"
    },
    image:{
      type:Array,
      required:true
    },
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { 
    collection:"products",
    timestamps: true }
);


// ProductSchema.pre(["find", "findOne", "findById"], function () {
//   this.populate(["category","order"]);
// });

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
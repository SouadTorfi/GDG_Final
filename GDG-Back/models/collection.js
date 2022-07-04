const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CollectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    collection: "collections",
    timestamps: true,
  }
);

CollectionSchema.pre(["find", "findOne", "findById"], function () {
  this.populate(["category_id"]);
});

const Collection = mongoose.model("collection", CollectionSchema);
module.exports = Collection;
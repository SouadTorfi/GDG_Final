const mongoose = require("mongoose");

const CurrencySchema = mongoose.Schema(
  {
    rate: {
      type: Number,
      required: true,
    },
  },
  { 
    collection:"currencies",
    timestamps: true }
);

const Currency = mongoose.model("Currency", CurrencySchema);
module.exports = Currency;
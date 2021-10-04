const mongoose = require("mongoose");

let ProductSchema = new mongoose.Schema({
  amountAvailable: Number,
  cost: Number,
  productName: String,
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);

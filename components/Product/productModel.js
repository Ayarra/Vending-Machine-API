const mongoose = require("mongoose");
const Joi = require("joi");

let ProductSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  amountAvailable: { type: Number, required: true, min: 1 },
  cost: { type: Number, required: true, min: 0 },
  date: {
    type: Date,
    default: Date.now,
  },
});

const validateProduct = (product) => {
  const schema = Joi.object({
    productName: Joi.string().min(3).max(50).required(),
    amountAvailable: Joi.number().greater(1).required(),
    cost: Joi.number().greater(0).required(),
  });

  return schema.validate(product);
};

module.exports.Product = mongoose.model("Product", ProductSchema);
module.exports.validate = validateProduct;

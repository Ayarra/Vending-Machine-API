const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
const { Product } = require("../Product/productModel");
const { User } = require("../User/userModel");

module.exports.buying = async (req, res) => {
  const { error } = validateOperation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (mongoose.isValidObjectId(req.body.productId) || !req.body.productId) {
    if (req.body.productAmount <= 0)
      return res.send(400).send("Supply a positive product amount.");

    const product = await Product.findById(req.body.productId);
    const buyer = await User.findById(req.user._id);
    // console.log(product, buyer);
    if (!product) res.status(400).send("Not enough stock.");

    const totalSpent = req.body.productAmount * product.cost;
    const initDeposit = buyer.deposit;
    const productLeft = product.amountAvailable - req.body.productAmount;

    console.log(productLeft);
    if (!productLeft) res.status(400).send("Not enough stock.");

    if (totalSpent <= buyer.deposit) {
      buyer.deposit -= totalSpent;
      await User.updateOne({ _id: req.user._id }, { deposit: buyer.deposit });

      if (productLeft)
        await Product.updateOne(
          { _id: product._id },
          { amountAvailable: productLeft }
        );
      else await Product.deleteOne(product);
      res.send(
        `You have purchased ${
          product.productName
        } for a total of ${totalSpent} and your change is ${
          initDeposit - totalSpent
        }`
      );
    } else res.status(400).send("Not enough deposit.");
  } else res.status(400).send("Invalid product Id");
};

const validateOperation = (operation) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
    productAmount: Joi.number().min(1).required(),
  });

  return schema.validate(operation);
};

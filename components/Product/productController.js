const mongoose = require("mongoose");
const _ = require("lodash");
const { Product, validate } = require("./productModel");

module.exports.getAllProduct = async (req, res) => {
  const products = await Product.find().sort("productName");
  //   if (!products) res.send("no products available");
  res.send(products);
};

module.exports.getProduct = async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res
        .status(404)
        .send("The product with the given ID was not found");

    res.send(
      _.pick(product, ["_id", "productName", "amountAvailable", "cost"])
    );
  } else res.status(400).send("Invalid product Id");
};

module.exports.createProduct = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product(
    _.pick(req.body, ["productName", "amountAvailable", "cost"])
  );
  product.sellerId = req.user._id;
  product = await product.save();

  res.send(
    _.pick(product, [
      "_id",
      "productName",
      "amountAvailable",
      "cost",
      "sellerId",
    ])
  );
};

module.exports.updateProduct = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (mongoose.isValidObjectId(req.params.id)) {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res
        .status(404)
        .send("The product with the given ID was not found");

    if (req.user._id === product.sellerId.valueOf()) {
      await Product.updateOne(product, req.body);
      res.send(
        _.pick(product, ["_id", "productName", "amountAvailable", "cost"])
      );
    } else res.status(400).send("Not valid seller");
  } else res.status(400).send("Invalid product Id");
};

module.exports.deleteProduct = async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const product = await Product.findById(req.params.id);

    console.log(product);
    if (!product)
      return res
        .status(404)
        .send("The product with the given ID was not found");

    if (req.user._id === product.sellerId.valueOf()) {
      await Product.deleteOne(product);
      res.send(
        _.pick(product, ["_id", "productName", "amountAvailable", "cost"])
      );
    } else res.status(400).send("Not valid seller");
  } else res.status(400).send("Invalid product Id");
};

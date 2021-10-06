const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("./userModel");
const { Product } = require("../Product/productModel");

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find({}, "username").sort("username");
  res.send(users);
};

module.exports.getUser = async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).send("The user with the given ID was not found");

    res.send(_.pick(user, ["_id", "username", "deposit"]));
  } else res.status(400).send("Invalid user Id");
};

module.exports.userRegister = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registred.");

  user = new User(
    _.pick(req.body, ["username", "password", "deposit", "isSeller", "isBuyer"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const jwtToken = user.generateAuthToken();
  res
    .header("x-auth-token", jwtToken)
    .send(_.pick(user, ["_id", "username", "deposit", "isSeller", "isBuyer"]));
};

module.exports.updateUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (mongoose.isValidObjectId(req.params.id)) {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).send("The user with the given ID was not found");

    if (req.user._id === user._id.valueOf()) {
      await User.updateOne(user, req.body);
      res.send(_.pick(user, ["username", "deposit"]));
    } else res.status(400).send("Not valid user");
  } else res.status(400).send("Invalid user Id");
};

module.exports.deleteUser = async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).send("The user with the given ID was not found");

    if (req.user._id === user._id.valueOf()) {
      await Product.deleteMany({ sellerId: req.user._id });
      await User.deleteOne(user);
      res.send(_.pick(user, ["username", "deposit"]));
    } else res.status(400).send("Not valid user");
  } else res.status(400).send("Invalid user Id");
};

const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../User/userModel");

module.exports.reset = async (req, res) => {
  const { error } = validateReset(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  if (req.body.reset) user.deposit = 0;
  await User.updateOne({ _id: req.user._id }, { deposit: user.deposit });
  res.send(`Deposit reset to ${user.deposit}`);
};

const validateReset = (operation) => {
  const schema = Joi.object({
    reset: Joi.boolean().required(),
  });

  return schema.validate(operation);
};

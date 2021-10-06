const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../User/userModel");

module.exports.deposit = async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    if (![5, 10, 20, 50, 100].includes(req.body.deposit))
      return res
        .status(400)
        .send("The deposit must be a 5, 10, 20, 50 or 100 coins ");

    const user = await User.findById(req.user._id);

    user.deposit += req.body.deposit;
    await User.updateOne({ _id: req.user._id }, { deposit: user.deposit });
    res.send(`Deposit updated: ${user.deposit}`);
  } else res.status(400).send("Invalid user Id");
};

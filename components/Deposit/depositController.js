const mongoose = require("mongoose");
const _ = require("lodash");
const { User } = require("../User/userModel");

module.exports.deposit = async (req, res) => {
  console.log("test");
  if (mongoose.isValidObjectId(req.params.id)) {
    const user = await User.findById(req.user._id);
    console.log(user.deposit);
    user.deposit += req.body.deposit;
    await User.updateOne({ _id: req.user._id }, { deposit: user.deposit });
    console.log(user);
    res.send(`Deposit updated: ${user.deposit}`);
  } else res.status(400).send("Invalid user Id");
};

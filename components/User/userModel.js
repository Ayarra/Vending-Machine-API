const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },

  deposit: { type: Number, min: 0 },
  isBuyer: { type: Boolean, required: true },
  isSeller: { type: Boolean, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const jwtToken = jwt.sign(
    { _id: this._id, isBuyer: this.isBuyer, isSeller: this.isSeller },
    process.env.VENDINGMACHINE_JWT_PRIVATEKEY
  );
  return jwtToken;
};

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).max(1024).required(),
    deposit: Joi.number().greater(0),
    isBuyer: Joi.boolean().required(),
    isSeller: Joi.boolean().required(),
  });

  return schema.validate(user);
};

module.exports.User = mongoose.model("User", UserSchema);
module.exports.validate = validateUser;

const mongoose = require("mongoose");
const Joi = require("joi");

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
  isBuyer: Boolean,
  isSeller: Boolean,
});

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).max(1024).required(),
    deposit: Joi.number().greater(0),
  });

  return schema.validate(user);
};

module.exports.User = mongoose.model("User", UserSchema);
module.exports.validate = validateUser;

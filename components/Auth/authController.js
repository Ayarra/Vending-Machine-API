const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../User/userModel");

module.exports.userAuth = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password.");
  res.send(true);
};

const validate = (req) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).max(1024).required(),
  });

  return schema.validate(req);
};

const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("./userModel");

module.exports.userRegister = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registred.");

  user = new User(_.pick(req.body, ["username", "password", "deposit"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send(_.pick(user, ["_id", "username", "deposit"]));
};

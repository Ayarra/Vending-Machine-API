const { User, validate } = require("./userModel");

module.exports.userRegister = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registred.");

  user = new User({
    username: req.body.username,
    password: req.body.password,
    deposit: req.body.deposit,
  });
  await user.save();
  res.send(user);
};

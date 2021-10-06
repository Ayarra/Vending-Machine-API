const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Access denied. No token was provided");

  try {
    const decoded = jwt.verify(
      token,
      process.env.VENDINGMACHINE_JWT_PRIVATEKEY
    );
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
};

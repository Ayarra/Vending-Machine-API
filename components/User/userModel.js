const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  deposit: Number,
  isBuyer: Boolean,
  isSeller: Booleanl,
});

module.exports = mongoose.model("User", UserSchema);

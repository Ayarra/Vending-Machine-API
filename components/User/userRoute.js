const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.post("/", userController.userRegister);

module.exports = router;

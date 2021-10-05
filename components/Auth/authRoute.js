const express = require("express");
const authController = require("./authController");

const router = express.Router();

router.post("/", authController.userAuth);

module.exports = router;

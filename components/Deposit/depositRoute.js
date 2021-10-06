const express = require("express");
const depositController = require("./depositController");
const auth = require("../Auth/authMiddleware");
const buyer = require("../Auth/buyerMiddleware");
const router = express.Router();

router.post("/", [auth, buyer], depositController.deposit);

module.exports = router;

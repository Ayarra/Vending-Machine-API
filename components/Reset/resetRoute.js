const express = require("express");
const resetController = require("./resetController");
const auth = require("../Auth/authMiddleware");
const buyer = require("../Auth/buyerMiddleware");

const router = express.Router();

router.post("/", [auth, buyer], resetController.reset);

module.exports = router;

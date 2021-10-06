const express = require("express");
const buyController = require("./buyController");
const auth = require("../Auth/authMiddleware");
const buyer = require("../Auth/buyerMiddleware");

const router = express.Router();

router.post("/", [auth, buyer], buyController.buying);

module.exports = router;

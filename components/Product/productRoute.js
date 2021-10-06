const express = require("express");
const productController = require("./productController");
const auth = require("../Auth/authMiddleware");
const seller = require("../Auth/sellerMiddleware");

const router = express.Router();

// console.log(productController);
router.get("/", productController.getAllProduct);
router.post("/", [auth, seller], productController.createProduct);
router.get("/:id", productController.getProduct);
router.put("/:id", [auth, seller], productController.updateProduct);
router.delete("/:id", [auth, seller], productController.deleteProduct);

module.exports = router;

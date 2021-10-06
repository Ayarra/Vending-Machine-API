const express = require("express");
const userController = require("./userController");
const auth = require("../Auth/authMiddleware");
const seller = require("../Auth/sellerMiddleware");
const router = express.Router();

router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUser);
router.post("/", userController.userRegister);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;

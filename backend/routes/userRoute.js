const express = require("express");
const router = express.Router();
// Controller functions
const { checkUser, register, login } = require("../controller/userController");
// Middleware for authentication
const { authMiddleware } = require("../middleware/authMiddleware");


//check user routes
router.get("/checkUser", authMiddleware, checkUser);

// Register routes
router.post("/register", register);

// Login routes
router.post("/login", login);

module.exports = router;

const express = require("express");
const router = express.Router();
// Controller functions
const {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
} = require("../controller/questionController");

// Middleware for authentication
const { authMiddleware } = require("../middleware/authMiddleware");

// Get All Questions routes
router.get("/", authMiddleware, getAllQuestions);

// Get Single Question routes
router.get("/:question_id", authMiddleware, getSingleQuestion);

// Post Question routes
router.post("/", authMiddleware, postQuestion);

module.exports = router;

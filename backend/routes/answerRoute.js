const express = require('express');
const router = express.Router();

// Controller functions
const { getAnswersById, postAnswer } = require('../controller/answerController');

// Get Answers routes
router.get('/:question_id', getAnswersById);

// Post Answers routes
router.post('/', postAnswer);



module.exports = router;
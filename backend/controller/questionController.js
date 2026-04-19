const express = require("express");
const router = express.Router();



function getAllQuestions(req, res) {
  res.send("Get All Questions");
}

function getSingleQuestion(req, res) {
  res.send("Get Single Question");
}

function postQuestion(req, res) {
  res.send("Post Question");
}

module.exports = {
  getAllQuestions,
  getSingleQuestion,
  postQuestion
};
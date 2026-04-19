function getAnswersById(req, res) {
  res.send("Get Answers by Question ID");
}

function postAnswer(req, res) {
  res.send("Post Answer");
}

module.exports = {
  getAnswersById,
  postAnswer
};

const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authorization header is missing or invalid" });
  }

  const token = authHeader.substring(7); // Remove "Bearer " prefix

  try {
    const {username, userid} = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {username, userid};
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid or expired token" });
  }
}

module.exports = { authMiddleware };

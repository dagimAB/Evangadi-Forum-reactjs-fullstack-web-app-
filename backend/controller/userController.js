// db connection file
const dbconnection = require("../db/dbconfig");

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body || {};

  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  try {
    const [existingUser] = await dbconnection.execute(
      "SELECT * FROM users WHERE email = ? AND username = ?",
      [email, username],
    );
    if (existingUser.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email or username already exists" });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await dbconnection.execute(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword],
    );
    res
      .status(201)
      .json({ message: "User registered successfully", userId: rows.insertId });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error registering user" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await dbconnection.execute(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email],
    );
    if (rows.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const username = rows[0].username;
    const userid = rows[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in user:", err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error logging in user" });
  }
}

async function checkUser(req, res) {
  try {
    const { email } = req.body || {};
    const [rows] = await dbconnection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );
    if (rows.length > 0) {
      res.json({ message: "User exists", user: rows[0] });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error checking user:", err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error checking user" });
  }
}

module.exports = {
  register,
  login,
  checkUser,
};

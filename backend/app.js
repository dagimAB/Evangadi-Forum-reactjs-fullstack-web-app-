require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;

const cors = require("cors");

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());

// Middleware to handle CORS for frontend requests with credentials
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// db connection file
const dbconnection = require("./db/dbconfig");

// user routes middleware file
const userRoutes = require("./routes/userRoute");
// question routes middleware file
const questionRoutes = require("./routes/questionRoute");
// answer routes middleware file
const answerRoutes = require("./routes/answerRoute");

// user routes middleware
app.use("/api/user", userRoutes);

// answer routes middleware
app.use("/api/answers", answerRoutes);

// question routes middleware
app.use("/api/questions", questionRoutes);

async function testDBConnection() {
  try {
    const [rows] = await dbconnection.execute("SELECT 'test'");
    console.log("Database connection successful. Query result:", rows);

    await app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error executing query:", err);
  }
}
// Call the test function
testDBConnection();

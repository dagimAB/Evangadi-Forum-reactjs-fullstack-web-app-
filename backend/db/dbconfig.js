const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
  connectionLimit: 10,
});
console.log(process.env.JWT_SECRET);
// dbconnection.execute("SELECT 'test'", (err, results) => {
//   if (err) {
//     console.error("Error executing query:", err.message);
//     return;
//   }
//   console.log("Query results:", results);
// });

module.exports = dbconnection.promise();

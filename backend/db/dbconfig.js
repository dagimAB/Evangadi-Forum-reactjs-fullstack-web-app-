const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  database: process.env.DB_DATABASE,
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

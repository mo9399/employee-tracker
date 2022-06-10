const mysql = require("mysql2"); // import all necessary dependencies

// connect to database
const db = mysql.createConnection({ 
    host: "localhost",
    // your mysql username
    user: "root",
    // your mysql password
    password: "Allah1136$",
    database: "employees",
  },
  console.log("Connected to the employee database.")
);

module.exports = db;
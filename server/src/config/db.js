const mysql = require("mysql2/promise");
const { dbHost, dbUser, dbPassword, dbName } = require("./secret");

const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  dateStrings: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

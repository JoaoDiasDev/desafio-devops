require("dotenv").config();

const config = {
  host: process.env.HOST || "db",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "root",
  database: process.env.DATABASE || "node_db",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);

module.exports = connection;

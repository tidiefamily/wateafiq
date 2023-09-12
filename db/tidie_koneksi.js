const mysql = require("mysql2/promise");
const { json } = require("express");
const fs = require("fs");

// create the connection to database
const tidiekoneksi = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "webapi",
  password: "wafiqu",
});

module.exports = tidiekoneksi;

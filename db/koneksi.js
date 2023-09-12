// const tes = require("mysql2/promise");
const mysql = require("mysql2");
const { json } = require("express");
const fs = require("fs");

// create the connection to database
const tidieteafiq = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "webapi",
  password: "wafiqu",
});

// const dataquery = tidieteafiq.query(
//   "SELECT * FROM message_start LEFT JOIN msg_res_start mrs ON mrs.id_msg_start=message_start.id",
//   (err, rows) => {
//     if (err) throw err;

//     console.log("Data received from Db:");
//     var data = JSON.parse(JSON.stringify(rows));
//     console.log(data);
//   }
// );

module.exports = { tidieteafiq };

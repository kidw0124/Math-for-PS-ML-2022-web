const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dbconfig = require("./../config/database.config.js").dbconfig;
const mathkor = mysql.createConnection({ ...dbconfig, database: "MatKor" });
console.log(mathkor);

module.exports = { router };

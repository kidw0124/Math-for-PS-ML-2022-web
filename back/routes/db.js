const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dbconfig = require("./../config/database.config.js").dbconfig;
const matkor = mysql.createConnection({ ...dbconfig, database: "MatKor" });

matkor.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to MatKor");
	}
});

const insertUser = (user) => {
	return new Promise((resolve, reject) => {
		matkor.query(
			"INSERT INTO users (id, password, name, email, last_login, register_date) VALUES (?, ?, ?, ?, null, now())",
			[user.id, user.password, user.name, user.email],
			function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
};
const selectUser = (id) => {
	return new Promise((resolve, reject) => {
		matkor.query(
			"SELECT * FROM users WHERE id = ?",
			[id],
			function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
};

module.exports = { router, insertUser, selectUser };

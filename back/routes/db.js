const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dbconfig = require("./../config/database.config.js").dbconfig;
const matkor = mysql.createConnection({ ...dbconfig, database: "MatKor" });
const hash = require("./../modules/hash");

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

const selectUserByName = (name) => {
	return new Promise((resolve, reject) => {
		matkor.query(
			"SELECT * FROM users WHERE name = ?",
			[name],
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

const selectSessionCount = (session_key) => {
	return new Promise((resolve, reject) => {
		matkor.query(
			"SELECT * FROM sessions WHERE session_key = ?",
			[session_key],
			function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result.length);
				}
			}
		);
	});
};

const createSession = async (user, ip) => {
	const date = new Date();
	const uid = (await selectUser(user.id))[0].uid;
	const session_key = hash.hash(user.id + ip);
	matkor.query("UPDATE users SET last_login = ? WHERE uid = ?", [
		date.toISOString().slice(0, 19).replace("T", " "),
		uid,
	]);
	const session_count = await selectSessionCount(session_key);
	console.log(session_count);
	if (session_count === 0) {
		return new Promise((resolve, reject) => {
			matkor.query(
				"INSERT INTO sessions (uid, expire, ip, session_key) VALUES (?, ?, ?, ?)",
				[
					uid,
					new Date(date.setMonth(date.getMonth() + 1))
						.toISOString()
						.slice(0, 19)
						.replace("T", " "),
					ip,
					session_key,
				],
				function (err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(session_key);
					}
				}
			);
		});
	} else {
		matkor.query("UPDATE sessions SET expire = ? WHERE session_key = ?", [
			new Date(date.setMonth(date.getMonth() + 1))
				.toISOString()
				.slice(0, 19)
				.replace("T", " "),
			session_key,
		]);
		return session_key;
	}
};

module.exports = {
	router,
	insertUser,
	selectUser,
	createSession,
	selectUserByName,
	selectUserBySession,
};

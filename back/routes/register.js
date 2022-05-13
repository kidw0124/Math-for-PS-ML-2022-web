const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const db = require("./db");
const saltRounds = 10;

router.post("/", (req, res) => {
	const { id, password, name, email } = req.body;
	const hash = bcrypt.hashSync(password, saltRounds);
	const user = { id, password: hash, name, email };
	db.insertUser(user)
		.then((result) => {
			res.send({
				success: true,
				message: "회원가입 성공",
			});
		})
		.catch((err) => {
			res.send({
				success: false,
				message: "데이터베이스 오류",
			});
		});
});

module.exports = router;

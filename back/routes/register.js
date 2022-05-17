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

router.post("/id-duplicate-check", (req, res) => {
	const { id } = req.body;
	db.selectUser(id)
		.then((result) => {
			if (result.length === 0) {
				res.send({
					success: true,
					message: "사용 가능한 아이디입니다.",
				});
			} else {
				res.send({
					success: false,
					message: "이미 사용중인 아이디입니다.",
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.send({
				success: false,
				message: "데이터베이스 오류",
			});
		});
});
router.post("/name-duplicate-check", (req, res) => {
	const { name } = req.body;
	db.selectUserByName(name)
		.then((result) => {
			if (result.length === 0) {
				res.send({
					success: true,
					message: "사용 가능한 이름입니다.",
				});
			} else {
				res.send({
					success: false,
					message: "이미 사용중인 이름입니다.",
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.send({
				success: false,
				message: "데이터베이스 오류",
			});
		});
});

module.exports = router;

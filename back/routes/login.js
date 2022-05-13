const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("./db");
const saltRounds = 10;

router.get("/", (req, res) => {
	const { id, password } = req.query;
	console.log(id, password);
	db.selectUser(id)
		.then((result) => {
			if (result.length === 0) {
				res.send({
					success: false,
					message: "아이디가 없습니다.",
				});
			} else {
				const user = result[0];
				if (bcrypt.compareSync(password, user.password)) {
					res.send({
						success: true,
						message: "로그인 성공",
						user: user,
					});
				} else {
					res.send({
						success: false,
						message: "비밀번호가 틀렸습니다.",
					});
				}
			}
		})
		.catch((err) => {
			res.send({
				success: false,
				message: "데이터베이스 오류",
			});
		});
});

module.exports = router;

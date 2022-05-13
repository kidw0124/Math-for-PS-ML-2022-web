const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("./db");
const saltRounds = 10;

router.post("/", (req, res) => {
	const { id, password } = req.query;
	const { ip } = req.body;
	console.log(id, password);
	db.selectUser(id)
		.then(async (result) => {
			if (result.length === 0) {
				res.send({
					success: false,
					message: "아이디가 없습니다.",
				});
			} else {
				const user = result[0];
				if (bcrypt.compareSync(password, user.password)) {
					const session = await db.createSession(user, ip);
					res.send({
						success: true,
						message: "로그인 성공",
						session: session,
						user: user.id,
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
			console.log(err);
			res.send({
				success: false,
				message: "데이터베이스 오류",
			});
		});
});

module.exports = router;

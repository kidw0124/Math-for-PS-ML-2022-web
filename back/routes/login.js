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
router.post("/user-info", async (req, res) => {
	const { sessionKey, ip } = req.body;
	const user = await db.selectUserBySession(sessionKey);
	const now = new Date();
	if (user.length === 0) {
		res.send({
			success: false,
			message: "세션이 존재하지 않습니다.",
		});
	} else if (ip !== "" && user[0].ip !== ip) {
		res.send({
			success: false,
			message: "세션이 유효하지 않습니다.",
		});
	} else if (new Date(Date.parse(user[0].expire)) < now) {
		console.log(new Date(Date.parse(user[0].expire)), now);
		res.send({
			success: false,
			message: "세션이 만료되었습니다.",
		});
	} else {
		const { id, name, email } = user[0];
		res.send({
			success: true,
			message: "사용자 정보 조회 성공",
			user: {
				id,
				name,
				email,
			},
		});
	}
});

module.exports = router;

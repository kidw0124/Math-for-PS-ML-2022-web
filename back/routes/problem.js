const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/title/:problemNumber", function (req, res, next) {
	res.send("problem " + req.params.problemNumber);
});

router.get("/list", function (req, res, next) {
	db.getAllProblems()
		.then((problems) => {
			res.send(problems);
		})
		.catch((err) => {
			res.send(err);
		});
});

module.exports = router;

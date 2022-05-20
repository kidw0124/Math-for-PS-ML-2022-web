const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/title/:problemNumber", function (req, res, next) {
	const problemNumber = req.params.problemNumber;
	db.getProblem(problemNumber).then((probdt) => {
		if (probdt.length === 0) {
			res.status(404).send("Page not found");
		} else {
			res.send(probdt[0].title);
		}
	});
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

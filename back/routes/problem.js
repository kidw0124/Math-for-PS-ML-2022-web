const express = require("express");
const router = express.Router();
const db = require("./db");
const fs = require("fs");

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

router.post("/content/:problemNumber", async function (req, res, next) {
	const problemNumber = req.params.problemNumber;
	const problem = await db.getProblem(problemNumber);
	if (problem.length === 0) {
		res.status(404).send("Page not found");
	} else {
		const problemPath = `./problems/${problem[0].path}/${problem[0].number}.md`;
		fs.readFile(problemPath, "utf8", function (err, data) {
			if (err) {
				console.log(err);
				res.status(500).send("Internal server error");
			} else {
				console.log(data);
				res.send(data);
			}
		});
	}
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

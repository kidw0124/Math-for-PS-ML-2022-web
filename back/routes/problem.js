var express = require("express");
var router = express.Router();

router.get("/title/:problemNumber", function (req, res, next) {
	res.send("problem " + req.params.problemNumber);
});

module.exports = router;

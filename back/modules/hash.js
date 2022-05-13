const crypto = require("crypto");
const keys = require("./../config/keys");

const hash = (pw) => {
	const hashpw = crypto
		.createHash("sha512")
		.update(pw + keys.secretKey)
		.digest("hex");
	return hashpw;
};

module.exports = { hash };

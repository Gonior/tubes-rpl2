const jwt = require("jsonwebtoken");
const { secret } = require('../config/config')
module.exports = adminOnly = () => {
	return (req, res, next) => {
		if (req.headers.authorization) {
			let token = req.headers.authorization.split(" ")[1];
			jwt.verify(token, secret, (err, decode) => {
				if (decode) {
					if (decode.role !== "Admin")
						return res.status(401).json({ text: "Admin only" });
					else next();
				} else next();
			});
		} else {
			next();
		}
	};
};
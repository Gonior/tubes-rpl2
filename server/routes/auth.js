const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require('../config/config')
const User = require('../models/Users.models')


// router.post("/loginAdmin", (req, res) => {
// 	const { errors, isValid } = validateLoginInput(req.body);

// 	if (!isValid) {
// 		return res.status(400).json(errors);
// 	} else {
// 		const pin = req.body.pin;
// 		User.findOne({ pin: pin, role: "Admin" }).then((user) => {
// 			if (!user) return res.status(400).json({ pin: "PIN is wrong" });
// 			else {
// 				const payload = {
// 					id: user._id,
// 					name: user.name,
// 					role: user.role,
// 				};
// 				jwt.sign(payload, secret, { expiresIn: "1d" }, (err, token) => {
// 					if (!err) {
//                         res.status(200).json({
// 							success: true,
// 							token: "Bearer " + token,
// 						});
// 					} else res.status(400).json(err);
// 				});
// 			}
// 		});
// 	}
// });
router.post('/verify', (req, res) => {
	if (req.headers.authorization) {
		let token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, secret, (err, decode) => {
			if (decode) {
				return res.status(200).json({verified : true})
			} else return res.status(500).send('Unauthorized');
		});
	} else {
		return res.status(500).send('Unauthorized');
	}
})

router.post("/", async (req, res) => {
	const { nope, password1 } = req.body;

	let user = await User.findOne({ nope: nope, password : password1 })
	if (!user) {
		return res.status(400).json({ message: "Nomor HP atau Password salah." });
	}
	else {
		const payload = {
			id: user._id,
			nama: user.nama,
			nope : user.nope
		};
		jwt.sign(
			payload,
			secret,
			{ expiresIn: "10h" },
			(err, token) => {
				if (!err) {
					res.json({ success: true,message : "Berhasil Login", token: "Bearer " + token });
				} else res.status(400).json(err);
			}
		);
	}
});

module.exports = router;
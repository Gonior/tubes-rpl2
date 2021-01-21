const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminOnly = require("../controller/validateAdmin");

router.get(
	"/",
	adminOnly(),
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		User.find({}).then((result) => {
			if (result) res.json(result);
			else res.status(400).json({ user: "Users is empty" });
		});
	}
);

router.post(
	"/add",
	adminOnly(),
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validateRegisterInput(req.body);
		//check validation
		if (!isValid) {
			return res.status(400).json(errors);
		} else {
			User.findOne({ pin: req.body.pin }).then((result) => {
				if (result) {
					return res.status(400).json({ pin: "PIN already exists" });
				} else {
					const newUser = User.create();

					newUser.name = req.body.name.trim();
					newUser.pin = req.body.pin.trim();
					newUser.role = req.body.role.trim();

					newUser
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err));
				}
			});
		}
	}
);

router.get(
	"/find/:id",
	adminOnly(),
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		User.findById(req.params.id).then((result) => {
			if (result) return res.json(result);
			else return res.status(400).json({ user: "User not found" });
		});
	}
);


module.exports = router;
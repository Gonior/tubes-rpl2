const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require('../config/config')
const User = require('../models/Users.models')
const Admin = require('../models/Admin.models')
const Puskesmas = require('../models/Puskesmas.models');
const { authenticateAdminToken } = require("../controller/myController");
const mongoose = require("mongoose");


router.get('/verify', (req, res) => {
	if (req.headers.authorization) {
		let token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, secret, (err, decode) => {
			if (decode) {
				return res.status(200).json({verified : true})
			} else return res.status(401).send('lah kenapa jir');
		});
	} else {
		return res.status(401).send('wkwkwk');
	}
})
router.post('/signup', async (req, res) => {
	const {nope, password, nama} = req.body
	
	let user = await User.findOne({ nope: nope })
	if (user) return res.status(400).json({message : "Nomor HP sudah di gunakan"})
	else {
		try {
			const newUser = new User({
			  'nama': nama,
			  'nope': nope,
			  'password' : password
			});
			let saveUser = await newUser.save(); //when fail its goes to catch
			if (saveUser) return res.status(200).json({message : "Berhasil mendaftar"})
		  } catch (err) {
			return res.status(400).json({message : err});
		  }
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
			nope : user.nope,
			isAdmin : false
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

router.post("/a", async (req, res) => {
	const { username, password } = req.body;
	let admin = await Admin.findOne({ username: username, password : password })
	if (!admin) {
		return res.status(400).json({ message: "Username atau Password salah." });
	}
	else {
		const payload = {
			id: admin._id,
			nama: admin.username,
			isAdmin : true
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

router.post("/pka", async (req, res) => {
	const { kode } = req.body;
	let puskesmas = await Puskesmas.findOne({kode : kode})
	if (!puskesmas) {
		return res.status(400).json({ message: "Kode Puskesmas tidak ditemukan" });
	}
	else {
		const payload = {
			id: puskesmas._id,
			isAdmin : true
		};
		jwt.sign(
			payload,
			secret,
			{ expiresIn: "10h" },
			(err, token) => {
				if (!err) {
					res.json({ success: true,message : "Berhasil Login", token: "Bearer " + token , pk : puskesmas._id});
				} else res.status(400).json(err);
			}
		);
	}
});

router.get('/usr/:id', authenticateAdminToken, async (req, res) => {
	if (mongoose.isValidObjectId(req.params.id)) {
		try {
			let user = await User.findOne({_id : req.params.id})	
			if (user) return res.status(200).json({user : user})
			else return res.status(404).json({message : 'User tidak ditemukan!'})
		} catch (error) {
			console.log(error)
			return res.status(400).json({message : 'Something wrong'})
		}
	} else return res.status(404).json({message : 'User tidak ditemukan!'})
	
	
})

module.exports = router;
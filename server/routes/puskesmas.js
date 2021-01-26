const express = require('express')
const upload = require('../controller/uploadController')
const {authenticateAdminToken} = require('../controller/myController')
const path = require('path')
const router = express.Router()
const Puskemas = require('../models/Puskesmas.models')
const fs = require('fs')


router.post('/add', authenticateAdminToken ,upload.single('foto'), async (req, res) => {
    let {nama, kode, alamat, fotoName} = req.body
    try {
        let newPk = new Puskemas({
            'nama' : nama,
            'kode' : kode,
            'alamat' : alamat,
            'fotoName' : fotoName
        })
        let savePk = await newPk.save(); //when fail its goes to catch
        if (savePk) return res.status(200).json({message : "Berhasil menambah puskesmas"})
      } catch (err) {
        return res.status(400).json({message : err});
      }
})

router.get('/', (req, res) => {

    try {
        Puskemas.find().then(result => {
            res.status(200).json({puskesmas : result})
            
        })
    } catch (err) {
        return res.status(400).json({message : err})
    }
    
})

router.delete("/:id",authenticateAdminToken , async (req ,res) => {
    
    Puskemas.findOne({_id : req.params.id}).then((result) => {
        let img = result.fotoName
        let pathImg = path.resolve(__dirname+`/../uploads/${img}`) 
        try {
            fs.unlink(pathImg, (err) => {
                if (err) {
                    console.log(err)
                    return
                } else {
                    Puskemas.remove({_id :req.params.id}).then(err => {
                        if (err.deletedCount == 0) {
                            console.log(err)
                            return res.status(400).json({message : err})
                        }
                        else return res.status(200).json({message : req.params.id +" has been delete"})
                    })
                }
            })    
        } catch (error) {
            console.log(error)
            return res.status(400).json({message : error})
        }
    }).catch(err => {
        console.log(error)
        return res.status(400).json({message : err})
    })
    
    
})

router.get('/photo/:img', (req, res) => {
	let img = req.params.img
	try {
		let pathImg = path.resolve(__dirname+`/../uploads/${img}`) 
		res.sendFile(pathImg)
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
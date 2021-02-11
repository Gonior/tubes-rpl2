const express = require('express')
const upload = require('../controller/uploadController')
const {authenticateAdminToken, getDate} = require('../controller/myController')
const path = require('path')
const router = express.Router()
const Puskemas = require('../models/Puskesmas.models')
const Queue = require('../models/Queue.models')
const fs = require('fs')



router.post('/add', authenticateAdminToken ,upload.single('foto'), async (req, res) => {
    let {nama, kode, alamat, fotoName} = req.body
    
    try {
        let newPk = new Puskemas({
            'nama' : nama,
            'kode' : kode,
            'alamat' : alamat,
            'fotoName' : fotoName,
            'img' : {
                data : fs.readFileSync(path.join(__dirname + '/../uploads/'+req.file.filename)),
                contentType : 'image/png'
            }

        })
        let savePk = await newPk.save(); //when fail its goes to catch
        if (savePk) return res.status(200).json({message : "Berhasil menambah puskesmas"})
      } catch (err) {
          console.log(err)
        return res.status(400).json({message : err});
      }
})

router.post('/edit/:id', authenticateAdminToken, upload.single('foto'), async (req, res) => {
    let {nama, alamat, fotoName} = req.body;
    try {
        
        let pkUpdate
        let before = await Puskemas.findOne({_id : req.params.id});

        if (before.fotoName !== fotoName) {
            const opt = {
                data : fs.readFileSync(path.join(__dirname + '/../uploads/'+req.file.filename)),
                contentType : 'image/png'
            }
            pkUpdate = await Puskemas.updateOne({_id : req.params.id}, {nama, alamat, fotoName, img : opt})
        } else pkUpdate = await Puskemas.updateOne({_id : req.params.id}, {nama, alamat, fotoName})
        if (pkUpdate.ok > 0) return res.status(200).json({message : 'Puskesmas berhasil dirubah'})
        else return res.status(400).json({message : 'something error'})
    } catch (error) {
        res.status(400).json({message : error})
        console.log(error)
    }
    

})
router.get('/', async (req, res) => {
    
    try {
        let puskesmas = await Puskemas.find({});
        try {
            let queues = await Queue.deleteMany({queued_on : {$ne : getDate()}})
        } catch (err) {console.log(err)}
        
        
        if (puskesmas) res.status(200).json({puskesmas : puskesmas})
        
        // Puskemas.find().then(result => {
        //     res.status(200).json({puskesmas : result})
        // })
    } catch (err) {
        console.log(err)
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
const express = require('express')
const router = express.Router()
const Queue = require('../models/Queue.models')
const {getDate} =require('../controller/myController')


router.post('/add', async (req, res) => {
    let {puskesmas_id, user_id} = req.body
    try {
        let newQ = new Queue({
            'puskemas_id' : puskesmas_id,
            'done' : false,
            'current' : false,
            'nomor' : await Queue.find({puskemas_id : puskesmas_id, queued_on:getDate()}).length++,
            'queued_on' : getDate(),
            'user_id' : user_id
        })
        let saveQ = await newQ.save(); //when fail its goes to catch
        if (saveQ) return res.status(200).json({message : "Berhasil mendaftar"})
      } catch (err) {
        return res.status(400).json({message : err});
      }
})

router.get('/:pkid', async (req, res) => {
    try {
        let queue = await Queue.find({puskemas_id : req.params.pkid, queued_on:getDate()})
        res.status(200).json({queue : queue})
    } catch (err) {
        console.log(err)
    }
    
    
})

module.exports = router
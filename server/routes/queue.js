const express = require('express')
const router = express.Router()
const Queue = require('../models/Queue.models')
const User = require('../models/Users.models')
const Puskesmas = require('../models/Puskesmas.models')
const {getDate, authenticateToken, authenticateAdminToken} =require('../controller/myController')
const mongoose = require('mongoose')

router.get('/status', authenticateToken, async (req, res) => {
    try {
        let checkYourQueue = await Queue.findOne({user_id : req.body.user.id, queued_on:getDate(), done : false, cancel : false})
        if (checkYourQueue) res.status(200).json({queued :true, on : checkYourQueue.puskesmas_id})
        else res.status(200).json({queued : false})
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    
})


router.post('/current', authenticateAdminToken, async (req, res) => {
    let {current} = req.body
    
    let nomor = current.nomor
    let queueUpdate = await Queue.updateOne({_id : current._id}, {done : true})

    let queues = await Queue.find({puskesmas_id : current.puskesmas_id, queued_on : getDate(), cancel : false, current : false, done : false})
    if (queueUpdate.ok > 0) {        
        let nextQueue;
        if (queues.length > 1 ) {
            let nextQueues = await queues.sort((a,b) => a.nomor - b.nomor)
            nextQueue = await Queue.updateOne({_id : nextQueues[0]._id}, {current : true})
        } else if (queues.length === 1) nextQueue = await Queue.updateOne({_id : queues[0]._id}, {current : true})
        else return res.status(200).json({message : `Antrean nomor ${nomor} sudah selesai!`})

        if (nextQueue.ok > 0) return res.status(200).json({message : `Antrean nomor Q-${nomor} sudah selesai!`})
        else return res.sendStatus(400)
    } else return res.sendStatus(400)

}) 
router.post('/add', authenticateToken, async (req, res) => {

    let {puskesmas_id, user_id, password} = req.body
    let current = false
    try {
        let user = await User.findOne({_id : user_id})
        if (user) {
            if (user.password !== password) return res.status(400).json({message : "Konfirmasi password salah"});
            let checkYourQueue = await Queue.findOne({user_id : user_id, queued_on:getDate(), done : false, cancel : false})
            if (checkYourQueue)  return res.status(400).json({message : "Gagal mendaftar antrean, silakan batalkan antrean anda sebelumnya"})

            let q = await Queue.find({puskesmas_id : puskesmas_id, queued_on:getDate(), cancel : false, done : false})
            if ( await q.length === 0 ) current = true
            let qLength = await Queue.find({puskesmas_id : puskesmas_id, queued_on:getDate()})
            try {
                let newQ = new Queue({
                    'puskesmas_id' : puskesmas_id,
                    'done' : false,
                    'current' : current,
                    'cancel' : false,
                    'nomor' : await qLength.length+1,
                    'queued_on' : getDate(),
                    'user_id' : user_id
                })
                let saveQ = await newQ.save(); //when fail its goes to catch
                if (saveQ) return res.status(200).json({message : "Berhasil mendaftar antrean"})
              } catch (err) {
                return res.status(400).json({message : err});
              }

        }
        else return res.status(400).json({message : "user not found"})
    } catch (error) {
        console.log(error)
    }
})
router.post('/cancel', authenticateToken, async (req, res) => {
    let {puskesmas_id, user_id, alasan} = req.body
    if (alasan == "") return res.status(400).json({message : "Setidaknya beri alasan, jangan seperti doi yang pergi tanpa alasan"})
    else {
        try {
            let cek = await Queue.findOne({puskesmas_id :puskesmas_id, user_id : user_id, queued_on:getDate(), cancel:false, done : false})
            let queue = await Queue.updateOne({puskesmas_id :puskesmas_id, user_id : user_id, queued_on:getDate(), cancel:false, done : false}, {cancel : true})
            if (cek.current) {
                let queues = await Queue.find({queued_on : getDate(), cancel : false, done : false, current : false})
            
                if (queues.length > 1) {
                    let sortqueues = queues.sort((a,b) => a.nomor - b.nomor) 
                    Queue.updateOne({_id : sortqueues[0]._id}, {current : true})
                } else if (queues.length === 1) Queue.updateOne({_id : queues[0]._id}, {current : true})
            }
            
            if (queue.ok > 0) res.status(200).json({message : "Antrean Berhasil dibatalkan!"})
            else res.status(400).json({message : "entah kenapa ga bisa dibatalkan gaes :)"})
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }
    }
})

router.get('/:pkid',  async (req, res) => {
    let pkid = req.params.pkid
    if (mongoose.isValidObjectId(pkid)) {
        try {
            let puskesmas = await  Puskesmas.findOne({_id : pkid})
            if (!puskesmas) return res.status(404).json({message : "Puskesmas Tidak Ditemukan"})
            else {
                try {
                    
                    let queue = await Queue.find({puskesmas_id : pkid, queued_on:getDate()})
                    res.status(200).json({queue : queue, user:req.body.user, puskesmas : puskesmas, tgl : getDate()})
                } catch (err) {
                    console.log(err)
                }  
            }
        } catch (err) {
            console.log(err)
        }
    } else return res.status(404).json({message : "Puskesmas Tidak Ditemukan"})
    
})
router.get('/pk/:pkid', authenticateToken, async (req, res) => {
    let pkid = req.params.pkid
    if (mongoose.isValidObjectId(pkid)) {
        try {
            let puskesmas = await  Puskesmas.findOne({_id : pkid})
            if (!puskesmas) return res.status(404).json({message : "Puskesmas Tidak Ditemukan"})
            else {
                try {
                    let queue = await Queue.find({puskesmas_id : pkid, queued_on:getDate()})
                    res.status(200).json({queue : queue, user:req.body.user, puskesmas : puskesmas, tgl : getDate()})
                } catch (err) {
                    console.log(err)
                }  
            }
        } catch (err) {
            console.log(err)
        }
    } else return res.status(404).json({message : "Puskesmas Tidak Ditemukan"})
})

module.exports = router
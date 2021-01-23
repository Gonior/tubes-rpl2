const mongoose = require('mongoose')

const PuskesmasSchema = new mongoose.Schema({
    nama : String,
    kode : String,
    alamat : String,
    fotoName : String
})

const puskesmas = mongoose.model("puskesmas", PuskesmasSchema)

module.exports = puskesmas 

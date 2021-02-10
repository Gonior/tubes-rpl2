const mongoose = require('mongoose')

const PuskesmasSchema = new mongoose.Schema({
    nama : String,
    kode : String,
    alamat : String,
    fotoName : String,
    img : {
        data : Buffer,
        contentType : String
    }
})

const puskesmas = mongoose.model("puskesmas", PuskesmasSchema)

module.exports = puskesmas 

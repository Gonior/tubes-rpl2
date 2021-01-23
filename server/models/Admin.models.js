const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    username: String,
    password : String
})

const admin = mongoose.model("admin", AdminSchema)

module.exports = admin
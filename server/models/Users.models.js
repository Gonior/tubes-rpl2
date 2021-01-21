const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nope : String,
    password : String,
    nama : String
})

const user = mongoose.model("users", UserSchema)

module.exports = user


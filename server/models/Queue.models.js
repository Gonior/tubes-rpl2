const mongoose = require('mongoose')

const QueueSchema = new mongoose.Schema({
    puskesmas_id : String,
    done : Boolean,
    current : Boolean,
    nomor : Number,
    queued_on :String,
    user_id : String
})
const queue = mongoose.model('queues', QueueSchema)

module.exports = queue
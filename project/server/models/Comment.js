const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment-timezone')

const commentSchema = Schema({
    description: String,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: moment(Date.now()).tz('Europe/Paris').format('LLLL')
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }
})

module.exports = mongoose.model('comment', commentSchema)
const mongoose = require ('mongoose')
// const Schema= mongoose.Schema
const moment= require('moment-timezone')
const Schema = mongoose.Schema

const userSchema=new mongoose.Schema({
    firstname: String,
    lastname: String,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:moment(Date.now()).tz('Europe/Paris').format('LLLL')
    },
    image:{
        type:Schema.Types.Mixed,
        default:"./images/default.jpg"
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    isBanned: {
        type: Boolean,
        default: false
    }
})

module.exports=mongoose.model('user',userSchema);
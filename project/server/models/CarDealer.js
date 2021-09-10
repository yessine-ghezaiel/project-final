const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const carSchema=new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    adresse:{
        type:String,
        required:true
    },
    src_maps:{
        type:String,
        required:true
    },
    image:{
        type:Schema.Types.Mixed,
        default:"./car.png"
    },
    region:String
    
})

module.exports=mongoose.model('car',carSchema);
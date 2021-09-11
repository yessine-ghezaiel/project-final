// const config = require('config')
require('dotenv').config({ path: './config/config.env' })
const cloudinary = require('cloudinary').v2

// cloudinary.config({
//     cloud_name: config.get("CLOUDINARY_CONFIG.CLOUD_NAME"),
//     api_key: config.get("CLOUDINARY_CONFIG.API_KEY"),
//     api_secret: config.get("CLOUDINARY_CONFIG.API_SECRET")

// })


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY ,
    api_secret: process.env.API_SECRET

})

module.exports = cloudinary
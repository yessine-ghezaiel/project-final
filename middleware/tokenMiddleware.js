const jwt = require('jsonwebtoken')
const config = require('config')
 const Post = require('../Models/Post')
 const Car = require('../Models/CarDealer')
const User= require('../models/User')
const Comment = require('../models/Comment')
require('dotenv').config({ path: '../config/config.env' })

const tokenMiddleware = async (req, res, next) => {
    try {
        const token = req.header("auth-token")
        if (!token)
            return res.status(401).json({ errors: [{ msg: 'UNTHORIZED OPERATION !' }] })
        const payload = await jwt.verify(token,process.env.SECRET )
        // config.get("JWT_CONFIG.SECRET")
        req.userId = payload.sub

        next()
    }
    catch (err) {
        res.status(401).json({ errors: [{ msg: err.message }] })
    }
}

const checkPostOwner = async (req,res,next)=>{
    try{
        const post= await Post.findOne({_id:req.params.id,owner:req.userId})
        if (!post)
            return res.status(401).json({err:'not authorized'})
        next( )
    }catch(err) {
        return res.status(401).json({err:err})
    }
}

const checkCar = async (req,res,next)=>{
    try{
        const car= await Car.findOne({_id:req.params.id})
        if (!car)
            return res.status(401).json({err:'not authorized'})
        next( )
    }catch(err) {
        return res.status(401).json({err:err})
    }
}

const checkAdmin = async (req,res,next)=>{
    try{
        const user= await User.findById(req.userId)
        console.log(req.userId)
        console.log(user)
        if (!user)
            return res.status(401).json({err:'not authorized  coucou '})
        if (user.role !== 'admin')
            return res.status(401).json({err:'not authorized user '})
        next()
    }catch(err) {
        return res.status(401).json({err:err})
    }
}

const checkCommentOwner = async (req,res,next)=>{
    try{
        const comment= await Comment.findOne({_id:req.params.id,owner:req.userId})
        if (!comment)
            return res.status(401).json({err:'not found'})
        next( )
    }catch(err) {
        return res.status(401).json({err:err})
    }
}
module.exports = { tokenMiddleware,checkPostOwner,checkCar,checkAdmin,checkCommentOwner}
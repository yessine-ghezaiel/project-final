const Comment = require('../models/Comment')
const cloudinary = require('../helpers/cloudinary')




const addComment = async (req, res) => {
    try {
        const {description} = req.body
        const newComment = new Comment({
            description,
            owner: req.userId,
            post:req.params.id
        })
        
        const savedComment = await newComment.save()
        res.json(savedComment)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}





const getAllComments = async(req,res)=>{
    try{
        let limit = +req.query.limit
        let pageNumber = +req.query.page
        let documentCount = await Comment.find({post:req.params.id}).countDocuments()
        let numberTotalOfpages = Math.ceil(documentCount / limit);

        /*   if (numberTotalOfpages < documentCount / limit)
              numberTotalOfpages++ */
        //out of band verification
        if (pageNumber > numberTotalOfpages)
            pageNumber = numberTotalOfpages
        /* if (pageNumber * limit > documentCount)
            limit = documentCount - ((pageNumber - 1) * limit) */
            const comments= await Comment.find({post:req.params.id})
            .select({ '__v': 0 })
            .sort({ 'createdAt': -1 })
            .populate({ path: 'owner', select: "firstname image lastname email _id role " })
            
        res.json({ comments })
    }catch(err){
        res.status(400).json({ err: err.message })
    }
}



const deleteComment= async(req,res)=>{
    try{
    const deletedComment = await Comment.findByIdAndDelete(req.params.id)
    res.json(deletedComment)
    }catch(err){
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}


const updateComment= async(req,res)=>{
    try{
        
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.json(updatedComment)
    }catch(err){
        res.status(400).json({ errors: [{ msg: err.message }]})
    }
}


const getCommentCount= async (req,res)=>{
    try{

        const count = await Comment.findByIdAndDelete({post:req.params.id}).countDocuments()
        res.json({count})
    }catch(err){
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}


module.exports = {getAllComments,deleteComment,updateComment,addComment,getCommentCount}
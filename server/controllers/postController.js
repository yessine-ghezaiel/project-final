const Post = require('../Models/Post')
const cloudinary = require('../helpers/cloudinary')




const addPost = async (req, res) => {
    try {
        const {title, description, image } = req.body
        const newPost = new Post({
            title,
            description,
            owner: req.userId
        })
        if (image) {
            const savedImage = await cloudinary.uploader.upload(image, {
                timeout: 60000,
                upload_preset: "yessine"
            })
            newPost.image = {
                url: savedImage.url,
                public_id: savedImage.public_id
            }
        }
        const savedPost = await newPost.save()
        res.json(savedPost)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}





const getAllPosts = async(req,res)=>{
    try{
        let limit = +req.query.limit
        let pageNumber = +req.query.page
        let search = req.query.search
        // console.log(search)
        let documentCount = await Post.find().countDocuments()
        let numberTotalOfpages = Math.ceil(documentCount / limit);

        /*   if (numberTotalOfpages < documentCount / limit)
              numberTotalOfpages++ */
        //out of band verification
        if (pageNumber > numberTotalOfpages)
            pageNumber = numberTotalOfpages
        /* if (pageNumber * limit > documentCount)
            limit = documentCount - ((pageNumber - 1) * limit) */
        const posts = await Post.find({title:{$regex: search}})
            .select({ '__v': 0 })
            .sort({ 'createdAt': -1 })
            .populate({ path: 'owner', select: "firstname image lastname email _id role " })
            .skip((pageNumber - 1) * limit)
            .limit(limit)
        res.json({ posts })
    }catch(err){
        res.status(400).json({ err: err.message })
    }
}


const getMyPosts = async(req,res)=>{
    try{
        let search = req.query.search
       
        const posts= await Post.find({owner:req.userId,title:{$regex: search}})
        .select({ '__v': 0 })
        .sort({ 'createdAt': -1 })
        .populate({ path: 'owner', select: "firstname image lastname email _id role " })
        
        res.json({ posts })
        
    }catch(err){
        res.status(400).json({ err: err.message })
    }
}
const deletePost= async(req,res)=>{
    try{
    const deletedPost = await Post.findByIdAndDelete(req.params.id)
    res.json(deletedPost)
    }catch(err){
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}


const updatePost= async(req,res)=>{
    try{
    const updatedPost = await Post.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
    res.json(updatedPost)
    }catch(err){
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}


const getPostCount= async (req,res)=>{
    try{
        const count = await Post.find().countDocuments()
        res.json({count})
    }catch(err){
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}


module.exports = {getAllPosts,deletePost,updatePost,getMyPosts,addPost,getPostCount}
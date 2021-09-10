const CarDealer = require('../Models/CarDealer')
const cloudinary = require('../helpers/cloudinary')


const addCarDealer = async (req, res) => {
    try {
        const {title,description,email,adresse,phoneNumber,region,src_maps,image} = req.body
        const newCarDealer = new CarDealer({
            title,
            description,email,
            adresse,phoneNumber,region,src_maps,image
            })
        if (image) {
            const savedImage = await cloudinary.uploader.upload(image, {
                timeout: 60000,
                upload_preset: "yessine"
            })
            newCarDealer.image = {
                url: savedImage.url,
                public_id: savedImage.public_id
            }
        }
        const savedCarDealer = await newCarDealer.save()
        res.json(savedCarDealer)
        console.log(savedCarDealer);
    
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}


const getAllCarDealers = async(req,res)=>{
    try{
        let limit = +req.query.limit
        let pageNumber = +req.query.page
        let documentCount = await CarDealer.find().countDocuments()
        let numberTotalOfpages = Math.ceil(documentCount / limit);
        /*   if (numberTotalOfpages < documentCount / limit)
              numberTotalOfpages++ */
        //out of band verification
        if (pageNumber > numberTotalOfpages)
            pageNumber = numberTotalOfpages
        /* if (pageNumber * limit > documentCount)
            limit = documentCount - ((pageNumber - 1) * limit) */
        const CarDealers = await CarDealer.find({})
            .select({ '__v': 0 })
            .sort({ 'createdAt': -1 })
            .populate({ path: 'owner', select: "title image phoneNumber desctiption adresse region email _id" })
            .skip((pageNumber - 1) * limit)
            .limit(limit)
        res.json({ CarDealers })
    }catch(err){
        res.status(400).json({ err: err.message })
    }
}


const deleteCarDealer= async(req,res)=>{
    try{
    const deletedCarDealer = await CarDealer.findByIdAndDelete(req.params.id)
    res.json(deletedCarDealer)
    }catch(err){
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}


const updateCarDealer= async(req,res)=>{
    try{
    
    const updatedCarDealer = await CarDealer.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
    res.json(updatedCarDealer)
    }catch(err){
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}


const getCarDealerCount= async (req,res)=>{
    try{
        const count = await CarDealer.find().countDocuments()
        res.json({count})
    }catch(err){
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}


module.exports = {getAllCarDealers,deleteCarDealer,updateCarDealer,addCarDealer,getCarDealerCount}
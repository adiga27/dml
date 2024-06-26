const catchAsync = require('../utils/catchAsync.js');
const {  deleteS3Image } = require('../utils/deleteImage.js');
const { uploadImageToS3 } = require('../utils/putImage.js');
const Material = require('./../model/model.js');
const { v4: uuidv4 } = require('uuid');

exports.getAllMaterial = catchAsync(async(req,res,next) =>{
    const material = await Material.find();
    
    return res.status(200).json({
        "status": "success",
        "message": material
    })
});

exports.getOneMaterial = catchAsync(async(req,res,next) => {
    const {id} = req.params;
    if (!id){
        return res.status(404).json({
            "status": "error",
            "message": "id not found"
        })
    }
    const material = await Material.findById(id);
    if(!material){
        return res.status(404).json({
            "status": "error",
            "message": "material not found"
        })
    };
    return res.status(200).json({
        "status":"success",
        "message":material
    });
})

exports.createMaterial = catchAsync(async(req,res,next)=>{
    const body = req.body;
    const {image} = req.files;
    if(!image){
        return res.status(404).json({
            "status": "error",
            "message": "image not found"
        })
    }

    const imageName = "images/"+uuidv4();
    const imageUrl = await uploadImageToS3(image.data,imageName);

    const material = await Material.create({
        ...body,
        imageUrl:imageUrl
    });

    return res.status(201).json({
        "status":"success",
        "message": material,
    })    
});

exports.updateMaterial = catchAsync(async(req,res,next) => {
    const {id} = req.params;
    if (!id){
        return res.status(404).json({
            "status": "error",
            "message": "id not found"
        })
    }
    const body = req.body;
    const image = req.files;

    const material = await Material.findById(id);
    if(!material){
        return res.status(404).json({
            "status": "error",
            "message": "material not found"
        })
    }
    let imageUrl = material.imageUrl;
    if(image){
        const imageName = material.imageUrl.slice(47);
        imageUrl = await uploadImageToS3(image.data,imageName);
    }

    const updatedMaterial = await Material.findByIdAndUpdate(id,{
        ...body,
        imageUrl:imageUrl
    },{
        new: true,
        runValidators: true,
    })
    if (!updatedMaterial) {
        res.status(404).json({
            "status":"error",
            "message": "No Document found with that ID!",
        })
    }

    return res.status(200).json({
        "status":"success",
        "message": updatedMaterial,
    })
})

exports.deleteMaterial = catchAsync(async (req,res,next) => {
    const {id} = req.params;
    if (!id){
        return res.status(404).json({
            "status": "error",
            "message": "id not found"
        })
    }
    const material = await Material.findById(id);
    if(!material){
        return res.status(404).json({
            "status": "error",
            "message": "material not found"
        })
    }

    const key = material.imageUrl.slice(47);
    console.log(key);
    const data = await deleteS3Image(key);
    if(data.$metadata.httpStatusCode !== 204){
        return res.status(500).json({
            "status":"error",
            "message":"Image not deleted"
        })
    }

    const deletedMaterial = await Material.findByIdAndDelete(id,{
        new: true,
        runValidators: true,
    });
    if (!deletedMaterial) {
        res.status(404).json({
            "status":"error",
            "message": "No Document found with that Id!",
        })
    }
    

    return res.status(200).json({
        "status":"success",
        "message": null,
    })
})
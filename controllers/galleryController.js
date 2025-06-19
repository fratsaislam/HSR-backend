const Gallery = require("../models/galleryModel");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs")

exports.getGallery = async (req, res) => {
    const { page } = req.query || 0;
    try{
        let pageNum;
        const galleryPerPage= 9;
        if(page >= 1){
            pageNum = page - 1;
        }else{
            pageNum = 0
        }
        const totalGallery = await Gallery.countDocuments();
              
        const totalPages = Math.ceil(totalGallery / galleryPerPage);

        const result = await Gallery.find().sort({ createdAt: -1 }).skip( pageNum * galleryPerPage ).limit(galleryPerPage);

        return res.status(200).json({ 
            success: true, 
            data: result,
            totalPages: totalPages,
            totalGallery: totalGallery,
            currentPage: pageNum,
            galleryPerPage: galleryPerPage,
            hasNextPage: pageNum < totalPages - 1,
            hasPrevPage: pageNum > 0
          });
    }catch(err){
        console.log(err);
    }
}

exports.createGallery = async (req, res) => {
    const { title, description, place } = req.body;
    const thumbnail = req.file;
    try{
        const url = await cloudinary.uploader.upload(thumbnail.path, {
            folder: "gallery_thumbnails",
            public_id: title.replace(/\s+/g, "-").toLowerCase(), // optional custom name
            timeout: 60000  // timeout in milliseconds (60 seconds)
        });

        fs.unlink(thumbnail.path, (err) => {
            if (err) console.error("Failed to delete local file:", err);
        });

        const result = await Gallery.create({
            title,
            description,
            place,
            thumbnail: url.secure_url
        })

        res.status(201).json({ success: true, message: "Gallery created !", data: result });
    }catch(err){
        console.log(err)
    }
}

exports.deleteGallery = async (req, res) => {
    const { _id } = req.body;
    try{
        const result = await Gallery.deleteOne({ _id });
        return res.status(200).json({ success: true, message: "Pic deleted!" });
    }catch(err){
        console.log(err);
    }
}
const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        trim : true,
    },
    place:{
        type: String,
        required: [true, 'place is required'],
        trim: true,
    },
    thumbnail:{
        type: String,
        required: [true, 'thumbnail is required'],
        trim: true,
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("Gallery", gallerySchema);
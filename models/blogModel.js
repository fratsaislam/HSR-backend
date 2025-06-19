const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
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
    body:{
        type: String,
        required: [true, 'Body is required'],
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

module.exports = mongoose.model("Blog", blogSchema);
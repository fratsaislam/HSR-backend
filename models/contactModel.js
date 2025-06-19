const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    phone:{
        type: String,
        required: [true, "Phone is required"],
        trim : true,
    },
    body:{
        type: String,
        required: [true, 'Body is required'],
        trim: true,
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("ContactUs", contactSchema);
const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    body:{
        type: String,
        required: [true, "body is required"],
        trim : true,
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    stars:{
        type: Number,
        required: [true, 'Wilaya is required'],
        trim: true
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("Review", ReviewSchema);
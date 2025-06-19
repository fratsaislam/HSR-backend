const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    phone:{
        type: String,
        required: [true, "Phone is required"],
        trim : true,
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    wilaya:{
        type: String,
        required: [true, 'Wilaya is required'],
        trim: true
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("Reservation", ReservationSchema);
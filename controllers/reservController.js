const Reservation = require("../models/reservationModel");
const { phoneSchema } = require("../middlewares/validator");

exports.getReservs = async (req, res) => {
    const { page } = req.query || 0;
    try{
        let pageNum;
        const reservPerPage= 9;
        if(page >= 1){
            pageNum = page - 1;
        }else{
            pageNum = 0
        }
        const totalReservs = await Reservation.countDocuments();
              
        const totalPages = Math.ceil(totalReservs / reservPerPage);

        const result = await Reservation.find().sort({ createdAt: -1 }).skip( pageNum * reservPerPage ).limit(reservPerPage);

        return res.status(200).json({ 
            success: true, 
            data: result,
            totalPages: totalPages,
            totalReservs: totalReservs,
            currentPage: pageNum,
            reservPerPage: reservPerPage,
            hasNextPage: pageNum < totalPages - 1,
            hasPrevPage: pageNum > 0
          });
    }catch(err){
        console.log(err);
    }
}

exports.createReserv = async (req, res) => {
    const { name, phone, date, wilaya} = req.body;
    
    try{
        const {error, value} = phoneSchema.validate({ phone });
        if(error){
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const result = await Reservation.create({
            name,
            phone,
            date,
            wilaya
        })
        res.status(200).json({ success: false, message: "Reservation created !", data: result });
    }catch(err){
        console.log(err);
    }
}

exports.deleteReserv = async (req, res) => {
    const { _id } = req.body;
    try{
        const result = await Reservation.deleteOne({_id});
        return res.status(200).json({success: true, message: "Reservation deleted!"})
    }catch(err){
        console.log(err);
    }
}
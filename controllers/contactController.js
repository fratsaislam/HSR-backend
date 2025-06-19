const ContactUs = require("../models/contactModel");
const { phoneSchema } = require("../middlewares/validator.js")

exports.getContacts = async (req, res) => {
    const { page } = req.query;
    const contactPerPage = 10;

    try{
        let pageNum = 0;
        if(page <= 1){
            pageNum = 0
        }else{
            pageNum = page - 1;
        }

        const result = await ContactUs.find().sort({createdAt: -1}).skip(pageNum * contactPerPage);
        res.status(200).json({success: true, message: "contactUs", data: result});
    }catch(err){
        console.log(err);
    }
}

exports.createContact = async (req, res) => {
    const { title, phone, body } = req.body;
    try{
        const { error, value } = phoneSchema.validate({ phone });
        if(error){
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const result = await ContactUs.create({
            title,
            phone,
            body,
        });
        return res.status(200).json({ success: true, message: "contact created successfuly", data: result});
    }catch(err){
        console.log(err);
    }
}
const Review = require("../models/reviewModel");

exports.getReviews = async (req, res) => {
    const { page } = req.query;
    try{
        let pageNum = page || 0;
        if(page >= 1){
            pageNum = page - 1;
        }else{
            pageNum = 0;
        }

        const reviewPerPage = 12;

        const result = await Review.find().sort({ createdAt : -1 }).skip(pageNum * reviewPerPage).limit(reviewPerPage);

        const totalReviews = await Review.countDocuments();
                      
        const totalPages = Math.ceil(totalReviews / reviewPerPage);
        
        
        return res.status(200).json({ 
            success: true, 
            data: result,
            totalPages: totalPages,
            totalReservs: totalReviews,
            currentPage: pageNum,
            reservPerPage: reviewPerPage,
            hasNextPage: pageNum < totalPages - 1,
            hasPrevPage: pageNum > 0
        });
    }catch(err){
        console.log(err)
    }
}

exports.createReview = async (req, res) => {
    const { name, body, date, stars } = req.body;
    try{
        const result = await Review.create({
            name,
            body,
            date,
            stars
        });

        res.status(201).json({ success: true, message : "Review created!" });
    }catch(err){
        console.log(err)
    }
}

exports.deleteReview = async (req, res) => {
    const { _id } = req.body;
    try{
        const result = await Review.deleteOne({ _id });

        res.status(200).json({ success: true, message: "Review deleted!" });
    }catch(err){
        console.log(err);
    }
}
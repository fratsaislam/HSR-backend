const express = require("express");
const router = express.Router();
const { identifier } = require("../middlewares/identification");
const reviewController = require("../controllers/reviewController")


router.get('/all-reviews', reviewController.getReviews);
router.post('/create-review', reviewController.createReview);
router.delete('/delete-review', identifier, reviewController.deleteReview);

module.exports = router;
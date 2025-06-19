const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer");

const { identifier } = require("../middlewares/identification");
const galleryController = require("../controllers/galleryController");

router.get('/all-gallery', galleryController.getGallery);
router.post('/create-gallery', identifier, upload.single("thumbnail"), galleryController.createGallery);
router.delete('/delete-gallery', identifier, galleryController.deleteGallery);

module.exports = router;
const express = require('express');
const router = express.Router();

const upload = require("../middlewares/multer");

const { identifier } = require("../middlewares/identification");
const blogController = require("../controllers/blogController");

router.get('/all-blogs', blogController.getBlogs);
router.post('/get-blog', blogController.singleBlog);
router.post('/create-blog', identifier, upload.single("thumbnail"), blogController.createBlog);
router.patch('/edit-blog', identifier, upload.single("thumbnail"), blogController.editBlogNewFile);
router.patch('/edit-blog-no-file', identifier, blogController.editBlogNoFile);
router.delete('/delete-blog', identifier, blogController.deleteBlog);
module.exports = router;
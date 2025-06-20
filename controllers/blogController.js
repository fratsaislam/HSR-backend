const Blog = require("../models/blogModel");
const cloudinary = require("../utils/cloudinary");
const fsPromises = require("fs").promises;


exports.getBlogs = async (req, res) => {
    const { page } = req.query;
    const blogPerPage = 9;
    
    try {
      let pageNum = page || 0;
      
      if (pageNum >= 1) {
        pageNum = pageNum - 1;
      } else {
        pageNum = 0;
      }
      
      // Get total count of blogs
      const totalBlogs = await Blog.countDocuments();
      
      // Calculate total pages
      const totalPages = Math.ceil(totalBlogs / blogPerPage);
      
      const result = await Blog.find().sort({ createdAt: -1 }).skip(pageNum * blogPerPage).limit(blogPerPage);
      
      return res.status(200).json({ 
        success: true, 
        data: result,
        totalPages: totalPages,
        totalBlogs: totalBlogs,
        currentPage: pageNum,
        blogPerPage: blogPerPage,
        hasNextPage: pageNum < totalPages - 1,
        hasPrevPage: pageNum > 0
      });
      
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Failed to fetch blogs", error: err.message });
    }
  }

exports.singleBlog = async (req, res) => {
    const { _id } = req.body;
    try{
        const existingBlog = await Blog.findOne({ _id });
        if(!existingBlog){
            return res.status(404).json({ success: false, message: "blog does not exists!"});
        }

        return res.status(200).json({ success:true, data: existingBlog});
    }catch(err){
        console.log(err);
    }
}

exports.createBlog = async (req, res) => {
    const { title, description, body } = req.body
    const thumbnail = req.file;

    try{
        const url = await cloudinary.uploader.upload(thumbnail.path, {
            folder: "blog_thumbnails",
            public_id: title.replace(/\s+/g, "-").toLowerCase(), // optional custom name
            timeout: 60000  // timeout in milliseconds (60 seconds)
        });


        const data = await Blog.create({
            title,
            description,
            body,
            thumbnail: url.secure_url,
        });

        res.status(201).json({ success: true, message: "blog created successfully", data });
    }catch(err){
        console.log(err);
    }
}

exports.editBlogNewFile = async (req, res) => {
    const { oldTitle } = req.query;
    const { title, description, body } = req.body;
    const thumbnail = req.file;

    try{
        const existingBlog = await Blog.findOne({ title:oldTitle });
        if(!existingBlog){
            return res.status(400).json({ success: false, message: "blog does not exist!"});
        }
        const url = await cloudinary.uploader.upload(thumbnail.path, {
            folder: "blog_thumbnails",
            public_id: title.replace(/\s+/g, "-").toLowerCase(), // optional custom name
            timeout: 60000  // timeout in milliseconds (60 seconds)
        });

        await fsPromises.unlink(thumbnail.path);

        existingBlog.title = title;
        existingBlog.description = description;
        existingBlog.body = body;
        existingBlog.thumbnail = url.secure_url;
        const result = await existingBlog.save();

        res.status(201).json({ success: true, message: "blog edited !", data: result });
    }catch(err){
        console.log(err);
    }
}

exports.editBlogNoFile = async (req, res) => {
    const { oldTitle } = req.query;
    const { title, description, body, thumbnail } = req.body;

    try{
        const existingBlog = await Blog.findOne({ title:oldTitle });
        if(!existingBlog){
            return res.status(400).json({ success: false, message: "blog does not exist!"});
        }
        existingBlog.title = title;
        existingBlog.description = description;
        existingBlog.body = body;
        existingBlog.thumbnail = thumbnail;
        const result = await existingBlog.save();

        res.status(201).json({ success: true, message: "blog edited !", data: result });
    }catch(err){
        console.log(err);
    }
}

exports.deleteBlog = async (req, res) => {
    const { _id } = req.body;
    try{
        const existingBlog = await Blog.deleteOne({ _id });
        if(!existingBlog){
            return res.status(400).json({ success: false, message: "blog does not exist!"});
        }

        res.status(200).json({ success: true, message: "blog deleted Successfully!"})
    }catch(err){
        console.log(err);
    }
}
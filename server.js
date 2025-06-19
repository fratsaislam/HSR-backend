const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const authRouter = require("./routers/authRouter");
const contactRouter = require("./routers/contactRouter");
const blogRouter = require("./routers/blogRouter");
const reservRouter = require("./routers/reservRouter");
const reviewRouter = require("./routers/reviewRouter");
const galleryRouter = require("./routers/galleryRouter");

app.use(cors({
    origin: 'https://hsr-backend-1.onrender.com', 
    credentials: true               // allow cookies and Authorization headers
}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


app.use('/api/auth', authRouter);
app.use('/api/contact-us', contactRouter);
app.use('/api/blog', blogRouter);
app.use('/api/reserv', reservRouter);
app.use('/api/review', reviewRouter);
app.use('/api/gallery', galleryRouter);

const startServer = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected successfully to DB");
        app.listen(process.env.PORT, () => {
            console.log(`Server Started at PORT : ${process.env.PORT}`);
        })
    }catch(err){
        console.log(err);
    }
}

startServer();
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

const allowedOrigins = [
    'https://happystay-dz-web.vercel.app',
    'http://localhost:3000',
];
  
app.use(cors({
origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
    } else {
    callback(new Error('Not allowed by CORS'));
    }
},
credentials: true
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
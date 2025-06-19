const {signinSchema} = require("../middlewares/validator");
const jwt = require('jsonwebtoken')


require('dotenv').config();

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const { error, value } = signinSchema.validate({ email, password });
        if(error){
            return res.status(401).json({success: false, message: error.details[0].message});
        }

        require('dotenv').config();

        const users = [
        { email: process.env.USER1_EMAIL, password: process.env.USER1_PASSWORD, username: process.env.USER1_USERNAME },
        { email: process.env.USER2_EMAIL, password: process.env.USER2_PASSWORD, username: process.env.USER2_USERNAME }
        ];

        const user = users.find(u => u.email === email && u.password === password);

        if(user){
            const token = jwt.sign({
                email,
                username: user.username,
            },process.env.TOKEN_SECRET,
            {
                expiresIn: '8h',
            });
            
            return res.cookie('Authorization',
                `Bearer ${token}`,
                {
                    expires: new Date(Date.now() + 8 * 3600000),
                    httpOnly: true,
                    secure: true,         // ✅ Render uses HTTPS
                    sameSite: "None"      // ✅ MUST be "None" to allow cross-origin cookies
                }).status(200).json({
                    success: true,
                    token,
                    message: "logged successfuly"
                }
            );
        }

        return res.status(400).json({success: false, message: "error happened in signin!"});


    }catch(err){
        console.log(err);
    }
}

exports.signout = async (req, res) => {
    res.clearCookie("Authorization").status(200).json({ success:true, message: "logged out succesfully" });
}

exports.testToken = async (req, res) => {
    return res.status(200).json({success: true, message: req.user});
}
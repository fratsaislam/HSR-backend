const Joi = require('joi');

exports.signinSchema = Joi.object({
    email: Joi.string().min(6).max(60).required().email({
        tlds: {allow:['com', 'net', 'dz']}
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')),
})  

exports.phoneSchema = Joi.object({
    phone: Joi.string().pattern(new RegExp('^\\+\\d{3}\\d{9}$')).required(),
})

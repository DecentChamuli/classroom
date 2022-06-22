// const Joi = require('joi')
import Joi from 'joi'

// Register Validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required(),
    })
    return schema.validate(data)
}

// Login Validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required(),
    })
    return schema.validate(data)
}

module.exports.loginValidation = loginValidation
module.exports.registerValidation = registerValidation
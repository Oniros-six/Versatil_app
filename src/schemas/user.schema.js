const Joi = require('joi');

const id = Joi.string()
const user = Joi.string().min(5)
const pass = Joi.string().min(8)

const getUserSchema = Joi.object({
    id: id.required()
})
const postUserSchema = Joi.object({
    user: user.required(),
    pass: pass.required(),
})
const updateUserSchema = Joi.object({
    user: user,
    pass: pass
})


module.exports = {getUserSchema, postUserSchema, updateUserSchema}
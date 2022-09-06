const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(1).max(30)
const user = Joi.string()

const postCategorySchema = Joi.object({
    name: name.required(),
    user: user.required()
})

const updateCategorySchema = Joi.object({
    name: name,
    user: user
})

const getCategorySchema = Joi.object({
    id: id.required()
})

module.exports = {postCategorySchema, getCategorySchema, updateCategorySchema}
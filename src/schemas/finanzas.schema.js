const Joi = require('joi');

const item = Joi.string().max(35);
const subTotal = Joi.number().integer();
const date = Joi.date();
const description = Joi.string().max(40);
const id = Joi.string();


const deleteFinanzasSchema = Joi.object ({
    id: id.required()
})

const postFinanzasSchema = Joi.object({
    id: id.required(),
    item: item.required(),
    subTotal: subTotal.required(),
    description: description,
    date: date.required()
})

const updateFinanzasSchema = Joi.object({
    id: id,
    item: item,
    subTotal: subTotal,
    description: description,
    date: date
})


module.exports = {deleteFinanzasSchema, postFinanzasSchema, updateFinanzasSchema}
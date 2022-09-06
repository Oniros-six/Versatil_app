const Joi = require('joi');

const item = Joi.string().max(35);
const quantity = Joi.number().integer();
const cost = Joi.number().integer();
const subTotal = Joi.number().integer();
const date = Joi.date();
const id = Joi.string();


const deleteFinanzasSchema = Joi.object ({
    id: id.required()
})

const postFinanzasSchema = Joi.object({
    id: id.required(),
    item: item.required(),
    quantity: quantity.required(),
    cost: cost.required(),
    subTotal: subTotal.required(),
    date: date.required()
})

const updateFinanzasSchema = Joi.object({
    id: id,
    item: item,
    quantity: quantity,
    cost: cost,
    subTotal: subTotal,
    date: date
})


module.exports = {deleteFinanzasSchema, postFinanzasSchema, updateFinanzasSchema}
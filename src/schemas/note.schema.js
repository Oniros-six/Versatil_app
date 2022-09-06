const Joi = require('joi');

const id = Joi.string()
const note = Joi.string()
const date = Joi.date()
const status = Joi.boolean()

const postNoteSchema = Joi.object({
    note: note.required(),
    date: date.required()
})
const updateNoteSchema = Joi.object({
    id: id.required(),
    note: note,
    date: date
})
const deleteNoteSchema = Joi.object({
    id: id.required()
})

module.exports = {postNoteSchema, updateNoteSchema, deleteNoteSchema}
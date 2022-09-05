const boom = require('@hapi/boom')

const Note = require('../models/Note');

class noteService {

    async getNotes(req) {
        const notes = await Note.find({category:req.params.id}).sort({status: "ascending"})
        return notes
    }

    async deleteNote(req) {
        await Note.findByIdAndRemove(req.params.id)
    }

    async postNote(req) {
        const fecha = new Date()
        const {note, category, date} = req.body.notasData
        
        const newNote = new Note({
            note:note,
            date: date === '' ? fecha : date,
            category:category
        })
        newNote.save()
    }

    async updateNote(req) {
        await Note.findByIdAndUpdate(req.body.notasData.id, {
            $set: req.body.notasData
        })
    }

    async toggleNote(req) {
        const note = await Note.findById(req.params.id)
        const nuevoEstado = !note.status;

        await Note.findByIdAndUpdate(req.params.id, {
            $set:{ 
                status: nuevoEstado
            }
        })
    }
}

module.exports = noteService 
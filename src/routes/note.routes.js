const express = require('express');
const router = express.Router();

const noteService = require('../services/note.service')
const services = new noteService()

const validatorHandler = require('../middleware/validator.handler');
const {getCategorySchema} = require('../schemas/category.schema')
const {postNoteSchema, updateNoteSchema, deleteNoteSchema} = require('../schemas/note.schema')


router.get('/:id', 
    validatorHandler(getCategorySchema, 'params'),
    async(req, res) => {
    try{
        const notes = await services.getNotes(req)
        res.json(notes)
    }
    catch(err){
        next(err)
    }
});

router.post('/', 
    validatorHandler(postNoteSchema, 'body[notasData]'),
    async(req, res) =>{
    try{
        await services.postNote(req)
        res.json({status:"Nota agregada"})
    }
    catch(err){
        next(err)
    }
})

router.delete('/:id', 
    validatorHandler(deleteNoteSchema, 'params'),
    async(req, res) => {
    try{
        await services.deleteNote(req)
        res.json({status: "Nota eliminada"})
    }
    catch(err){
        next(err)
    }
});

router.put('/', 
    validatorHandler(updateNoteSchema, 'body[notasData[id]]'),
    async(req, res) =>{
    try{
        await services.updateNote(req)
        res.json({status:"Nota editada"})
    }
    catch(err){
        next(err)
    }
})

// Toggle note

router.put('/toggle/:id', async(req, res) =>{
    try{
        await services.toggleNote(req)
        res.json({status:"Nota editada"})
    }
    catch(err){
        next(err)
    }
})


module.exports = router;


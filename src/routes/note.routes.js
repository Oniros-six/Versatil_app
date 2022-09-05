const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

const noteService = require('../services/note.service')
const services = new noteService()

router.get('/:id', async(req, res) => {
    try{
        const notes = await services.getNotes(req)
        res.json(notes)
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
});

router.post('/', async(req, res) =>{
    try{
        await services.postNote(req)
        res.json({status:"Nota agregada"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        await services.deleteNote(req)
        res.json({status: "Nota eliminada"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
});

router.put('/', async(req, res) =>{
    try{
        await services.updateNote(req)
        res.json({status:"Nota editada"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

// Toggle note

router.put('/toggle/:id', async(req, res) =>{
    try{
        await services.toggleNote(req)
        res.json({status:"Nota editada"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.post('/multiple/', async(req, res) =>{
    try{
        const arr = req.body;
        Note.insertMany(arr, function(error, docs) {});        

        res.json({status:"Nota agregada"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

module.exports = router;


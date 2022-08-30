const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.get('/:id', async(req, res) => {
    try{
        const notes = await Note.find({category:req.params.id}).sort({status: "ascending"})
        res.json(notes)
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
});

router.post('/', async(req, res) =>{
    try{
        const fecha = new Date()
        const {note, category, date} = req.body.notasData
        
        const newNote = new Note({
            note:note,
            date: date === '' ? fecha : date,
            category:category
        })
        newNote.save()
        
        
        res.json({status:"Nota agregada"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const notes = await Note.findByIdAndRemove(req.params.id)
        res.json({status: "Nota eliminada"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
});

router.put('/', async(req, res) =>{
    try{
        await Note.findByIdAndUpdate(req.body.notasData.id, {
            $set: req.body.notasData
        })
        res.json({status:"Nota editada"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

// Get one note
// router.get('/getOne/:id', async(req, res) => {
//     try{
//         const note = await Note.findById(req.params.id)
//         res.json(note)
//     }
//     catch(err){
//         console.log("Un error a ocurrido ", err)
//         res.json(err)
//     }
// });

// Toggle note

router.put('/toggle/:id', async(req, res) =>{
    try{
        const note = await Note.findById(req.params.id)
        const nuevoEstado = !note.status;

        await Note.findByIdAndUpdate(req.params.id, {
            $set:{ 
                status: nuevoEstado
            }
        })
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


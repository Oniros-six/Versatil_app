const express = require('express');
const router = express.Router();

const User = require('../models/user')
const Category = require('../models/category')
const Note = require('../models/Note');


router.get('/:id', async (req, res) =>{
    try{
        const categories = await Category.find({user:req.params.id}).sort({createdAt: "ascending"})
        res.json(categories)
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.post('/', async(req, res) =>{
    try{
        const {name, user} = req.body.categoriaData;
        const category = new Category({name, user})
        await category.save();
        await User.findByIdAndUpdate(
                user, { $push: { categories: category._id }},
            )

        res.json({status: "Categoria agregada"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.put('/:id', async(req, res) => {
    try{
        console.log(req.body.categoriaData)
        await Category.findByIdAndUpdate(req.params.id, {
        $set: req.body.categoriaData
        })
        res.json({status: "Categoria actualizada"});
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.delete('/:id', async (req, res) =>{
    console.log(req.params.id)
    try{
        await Note.deleteMany({category:req.params.id}) 
        await Category.findByIdAndRemove(req.params.id)
        res.json({status: "Categoria eliminada"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})



module.exports = router;
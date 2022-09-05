const express = require('express');
const router = express.Router();

const categoryService = require('../services/category.service');
const service = new categoryService()

router.get('/:id', async (req, res) =>{
    try{
        const categories = await service.getCategories(req)
        res.json(categories)
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.post('/', async(req, res) =>{
    try{
        await service.postCategory(req)
        res.json({status: 201});
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.put('/:id', async(req, res) => {
    try{
        await service.updateCategory(req)
        res.json({status: "Categoria actualizada"});
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        await service.deleteCategory(req)
        res.json({status: "Categoria eliminada"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})



module.exports = router;
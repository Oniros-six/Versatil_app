const express = require('express');
const router = express.Router();

const categoryService = require('../services/category.service');
const service = new categoryService()

const validatorHandler = require('../middleware/validator.handler')
const {postCategorySchema, getCategorySchema, updateCategorySchema} = require('../schemas/category.schema')
const {getUserSchema} = require('../schemas/user.schema')



router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res) =>{
    //El id al que se hace referencia, es al id del usuario
    try{
        const categories = await service.getCategories(req)
        res.json(categories)
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.post('/', 
    validatorHandler(postCategorySchema, 'body[categoriaData]'),
    async(req, res) =>{
    try{
        await service.postCategory(req)
        res.json({status: 201});
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.put('/:id', 
    validatorHandler(updateCategorySchema, 'body[categoriaData]'), 
    async(req, res) => {
    try{
        await service.updateCategory(req)
        res.json({status: "Categoria actualizada"});
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.delete('/:id',
    validatorHandler(getCategorySchema, 'params'),
    async (req, res) =>{
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
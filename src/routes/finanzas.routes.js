const express = require('express');
const router = express.Router();

const serviceFinanzas = require('../services/finanzas.service')
const service = new  serviceFinanzas()

const validatorHandler = require('../middleware/validator.handler');
const {deleteFinanzasSchema, postFinanzasSchema, updateFinanzasSchema} = require('../schemas/finanzas.schema')
const {getUserSchema} = require('../schemas/user.schema')

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async(req, res) =>{
    try{
        if (req.query.month !== undefined){
        const limit = parseInt(req.query.limit)
        const skip = parseInt(req.query.skip)
        const month = parseInt(req.query.month)
        const items = await service.getFinanzas(req, skip, limit, month)
        res.json(items)
        }
    }
    catch(err){
        next(err)
    }
})
router.get('/all/:id',
    validatorHandler(getUserSchema, 'params'),
    async(req, res) =>{
    try{

        const items = await service.getAllFinanzas(req)
        res.json(items)
        
    }
    catch(err){
        next(err)
    }
})

router.post('/',
    validatorHandler(postFinanzasSchema, 'body[item]'),
    async(req, res) =>{
    try{
        await service.postFinanzas(req)
        res.json({status:"Saved"})
    }
    catch(err){
        next(err)
    }
})
router.post('/ingreso',
    validatorHandler(postFinanzasSchema, 'body[item]'),
    async(req, res) =>{
    try{
        await service.postFinanzas(req)
        res.json({status:"Saved"})
    }
    catch(err){
        next(err)
    }
})

router.put('/',
    validatorHandler(updateFinanzasSchema, 'body[item]'),
    async(req, res) =>{
    try{
        await service.updateFinanzas(req)
        res.json({status: "Item actualizado"});
    }
    catch(err){
        next(err)
    }
})

router.delete('/:id',
    validatorHandler(deleteFinanzasSchema, 'params'),
    async (req, res) =>{
    try{
        await service.deleteFinanzas(req)
        res.json({status: "Item eliminado"})
    }
    catch(err){
        next(err)
    }
})

router.put('/toggle/:id', async(req, res) =>{
    try{
        await service.toggleFinanzas(req)
        res.json({status:"Item paid"})
    }
    catch(err){
        next(err)
    }
})

module.exports = router;


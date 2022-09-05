const express = require('express');
const router = express.Router();

const serviceFinanzas = require('../services/finanzas.service')
const service = new  serviceFinanzas()

router.get('/:id', async(req, res) =>{
    try{
        const items = await service.getFinanzas(req)
        res.json(items)
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.post('/', async(req, res) =>{
    try{
        await service.postFinanzas(req)
        res.json({status:"Saved"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.put('/', async(req, res) =>{
    try{
        await service.updateFinanzas(req)
        res.json({status: "Item actualizado"});
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        await service.deleteFinanzas(req)
        res.json({status: "Item eliminado"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.put('/toggle/:id', async(req, res) =>{
    try{
        await service.toggleFinanzas(req)
        res.json({status:"Item paid"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

module.exports = router;


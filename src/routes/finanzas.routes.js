const express = require('express');
const router = express.Router();

const Finanza = require('../models/finanza')

router.get('/:id', async(req, res) =>{
    try{
        const items = await Finanza.find({user:req.params.id}).sort({createdAt: "descending"})
        res.json(items)
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.post('/', async(req, res) =>{
    try{
        const fecha = new Date()
        const {item, quantity, cost, subTotal, date, user_id} = req.body.item;

        const newItem = new Finanza({item, quantity, cost, subTotal, date: date === '' ? fecha : date, user_id})
        newItem.save();
        res.json({status:"Saved"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.put('/', async(req, res) =>{
    try{
        await Finanza.findByIdAndUpdate(req.body._id, {
        $set: req.body
        })
        res.json({status: "Item actualizado"});
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        await Finanza.findByIdAndRemove(req.params.id)
        res.json({status: "Item eliminado"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.put('/toggle/:id', async(req, res) =>{
    try{
        const item = await Finanza.findById(req.params.id)
        console.log(item.paid)
        await Finanza.findByIdAndUpdate(req.params.id, {
            $set:{ 
                paid: !item.paid
            }
        })
        res.json({status:"Item paid"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

module.exports = router;


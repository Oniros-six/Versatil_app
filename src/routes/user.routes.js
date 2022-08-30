const express = require('express');
const router = express.Router();

const User = require('../models/user')
const Category = require('../models/category')
const Note = require('../models/Note');

router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.post('/', async (req, res) =>{
    try{
        const {user, pass} = req.body;
        const newUser = new User({user, pass});
        
        await newUser.save()
        res.json({status: "Usuario creado"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }

})

router.put('/:id', async(req, res) =>{
    try{
        const {user, pass} = req.body;
        const newUser = {user, pass};
        await User.findByIdAndUpdate(req.params.id, newUser)
        res.json({status: "Usuario editado"})
    }

    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const usuario = await User.findById(req.params.id)
        const categorias = usuario.categories
        for (let i = 0; i<categorias.length; ++i){
            let categoria = categorias[i]
            await Note.deleteMany({category:categoria}) 
            await Category.findByIdAndRemove(categoria) 
        }
        await User.findByIdAndRemove(req.params.id) 
    
        res.json("ok")
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

//Desactivar un usuario, en vez de eliminarlo
// //Lo dejo comentado porque al nno haber logica implementada, es inutil
// router.put('/:id', async(req, res) =>{
//     await User.findByIdAndUpdate(req.params.id, {
//         $set: {
//             active:false
//         }
//     })
//     res.json({status: "Usuario editado"})
// })

module.exports = router;
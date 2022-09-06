const express = require('express');
const router = express.Router();

const userService = require('../services/user.service')
const service = new userService

const validatorHandler = require('../middleware/validator.handler')
const {getUserSchema, postUserSchema, updateUserSchema} = require('../schemas/user.schema')

router.get('/', async (req, res) => {
    try{
        const users = await service.getUsers(req)
        res.json(users);
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.post('/', async (req, res) =>{
    try{
        await service.postUser(req)
        res.json({status: "Usuario creado"})
    }
    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }

})

router.put('/:id', async(req, res) =>{
    try{
        await service.updateUser(req)
        res.json({status: "Usuario editado"})
    }

    catch(err){
        console.log("Un error a ocurrido ", err)
        res.json(err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        await service.deleteUser(req)
        res.json("User deleted")
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
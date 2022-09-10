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
        next(err)
    }
})

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res) => {
    try{
        const user = await service.getSingleUser(req)
        res.json(user);
    }
    catch(err){
        next(err)
    }
})

router.post('/',
    validatorHandler(postUserSchema, 'req'),
    async (req, res) =>{
    try{
        await service.postUser(req)
        res.json({status: "Usuario creado"})
    }
    catch(err){
        next(err)
    }

})

router.put('/:id',
    validatorHandler(updateUserSchema, 'params'),
    async(req, res) =>{
    try{
        await service.updateUser(req)
        res.json({status: "Usuario editado"})
    }

    catch(err){
        next(err)
    }
})

router.delete('/:id', 
    validatorHandler(getUserSchema, 'params'),
    async(req, res) => {
    try{
        await service.deleteUser(req)
        res.json("User deleted")
    }
    catch(err){
        next(err)
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
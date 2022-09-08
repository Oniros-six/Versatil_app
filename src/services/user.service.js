const boom = require('@hapi/boom')

const User = require('../models/user')
const Category = require('../models/category')
const Note = require('../models/Note');

class userService {

    async getUsers (req) {
        const users = await User.find();
        return users
    }

    async getSingleUser (req) {
        const user = await User.findById(req.params.id);
        return user
    }

    async postUser (req) {
        const {user, pass} = req.body;
        const newUser = new User({user, pass});
        
        await newUser.save()
    }

    async deleteUser(req) {
        const usuario = await User.findById(req.params.id)
        const categorias = usuario.categories
        for (let i = 0; i<categorias.length; ++i){
            let categoria = categorias[i]
            await Note.deleteMany({category:categoria}) 
            await Category.findByIdAndRemove(categoria) 
        }
        await User.findByIdAndRemove(req.params.id) 
    
    }

    async updateUser(req) {
        const {user, pass} = req.body;
        const newUser = {user, pass};
        await User.findByIdAndUpdate(req.params.id, newUser)
    }

    async toggleOffUser(req) {
        
    }
}

module.exports = userService
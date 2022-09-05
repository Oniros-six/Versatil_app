const boom = require('@hapi/boom')

const User = require('../models/user')
const Category = require('../models/category')
const Note = require('../models/Note');

class categoriesService {

    async getCategories(req) {
        const categories = await Category.find({user:req.params.id}).sort({createdAt: "descending"})
        return categories
    }

    async postCategory(req) {
        const {name, user} = req.body.categoriaData;
        const category = new Category({name, user})
        await category.save();
        await User.findByIdAndUpdate(
                user, { $push: { categories: category._id }},
            )
    }

    async deleteCategory(req) {
        await Note.deleteMany({category:req.params.id}) 
        await Category.findByIdAndRemove(req.params.id)
    }

    async updateCategory(req) {
        await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body.categoriaData
            })
    }

}


module.exports = categoriesService
const {Schema, model} = require('mongoose');

const CategoriesSchema = new Schema({
    name: {type: String, requiered: true },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
    },
    {
        timestamps: true
    }
)

module.exports = model('Category', CategoriesSchema);
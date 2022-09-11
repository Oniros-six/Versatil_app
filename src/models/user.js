const {Schema, model} = require('mongoose');

const UsersSchema = new Schema({
    user: {type: String, requiered: true, unique: true },
    pass: { type: String, requiered: true},
    active: {type: Boolean, default: true},
    categories: [{
                    type: Schema.Types.ObjectId,
                    ref: 'Category'
                }]
})

module.exports = model('User', UsersSchema);

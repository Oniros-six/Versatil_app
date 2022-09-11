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

UsersSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.pass;
    return user;
  }

module.exports = model('User', UsersSchema);

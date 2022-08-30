const {Schema, model} = require('mongoose');

const FinanzasSchema = new Schema ({
    item: {type: String, required: true},
    quantity: {type: Number, required: true},
    cost: {type: Number, required: true},
    subTotal: {type: Number},
    date: { type: Date, default: Date.now() },
    paid: {type: Boolean, default: false},
    // salary: {type: Number, required: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User'}  
    },
    { 
        timestamps: true 
    })
module.exports = model('Finanza', FinanzasSchema)
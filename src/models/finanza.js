const {Schema, model} = require('mongoose');

const FinanzasSchema = new Schema ({
    item: {type: String, required: true},
    subTotal: {type: Number},
    description: {type: String, required: false},
    date: { type: Date, default: Date.now() },
    paid: {type: Boolean, default: false},
    user_id: {type: Schema.Types.ObjectId, ref: 'User'}  
    },
    { 
        timestamps: true 
    })
module.exports = model('Finanza', FinanzasSchema)
const {Schema, model} = require('mongoose');

const NotesSchema = new Schema({
    note: {type: String, requiered: true },
    date: { type: Date, default: Date.now() },
    status: {type: Boolean, default: false},
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
    },
    { 
        timestamps: true 
    }
)

module.exports = model('Note', NotesSchema);
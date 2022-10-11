const boom = require('@hapi/boom')
const Finanza = require('../models/finanza')

class finanzaService {

    async getFinanzas(req) {
        const items = await Finanza.find({user:req.params.id}).sort({createdAt: "descending"})
        return(items)
    }

    async postFinanzas(req) {
        const fecha = new Date()
        const {item, subTotal, description, date, user_id} = req.body.item;

        const newItem = new Finanza({item, subTotal, description, date: date === '' ? fecha : date, user_id})
        newItem.save();
    }

    async deleteFinanzas(req) {
        await Finanza.findByIdAndRemove(req.params.id)
    }

    async updateFinanzas(req) {
        await Finanza.findByIdAndUpdate(req.body._id, {
            $set: req.body
            })
    }

    async toggleFinanzas(req) {
        const item = await Finanza.findById(req.params.id)
        await Finanza.findByIdAndUpdate(req.params.id, {
            $set:{ 
                paid: !item.paid
            }
        })
    }

}

module.exports = finanzaService 
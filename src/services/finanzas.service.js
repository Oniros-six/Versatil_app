const boom = require('@hapi/boom')
const Finanza = require('../models/finanza')



class finanzaService {

    async getFinanzas(req, skip, limit, month) {
        let start = new Date()
        start.setFullYear(2022, month-1, 0)

        let end = new Date()
        end.setFullYear(2022, month, 0)
        
        if (skip < 0 || limit < 0) {
            skip = 0
            limit = 15
        }
        const items = await Finanza.find({user:req.params.id, date: {$gte: start, $lte: end}}).skip(skip).limit(limit).sort({date: "descending"})
        return(items)
    }

    async getAllFinanzas(req) {

        const items = await Finanza.find({user:req.params.id})
        return(items)
    }

    async postFinanzas(req) {
        const fecha = new Date()
        const {item, diferenciador, subTotal, description, date, user_id} = req.body.item;

        const newItem = new Finanza({item, diferenciador, subTotal, description, date: date === '' ? fecha : date, user_id})
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
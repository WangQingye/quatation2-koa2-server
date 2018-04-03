const mongoose = require('mongoose')

class GoodManager {
    static async addGood(ctx, next) {
        const Good = mongoose.model('Good');
        const Oplist = mongoose.model('OpList');
        const had = await Good.findOne({
            name: ctx.request.body.name
        })
        if (had) {
            ctx.body = {
                code: 222,
                msg: '已经有这个分类了'
            }
            return;
        }
        console.log(ctx.request.body.name);
        const d = ctx.request.body;
        ctx.body = await Good.create({
            category: d.category,
            name: d.name,
            format: d.format,
            nowStock: d.nowStock,
            price: d.price,
            note: d.note
        }, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('save ok');
            }
        })
    }
    static async getAllGoods(ctx, next) {
        const Good = mongoose.model('Good')
        const goods = await Good.find({}).sort({
            'meta.createdAt': -1
        })

        ctx.body = {
            goods
        }
    }
}

module.exports = GoodManager
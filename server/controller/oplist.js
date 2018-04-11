const mongoose = require('mongoose')

class opListManager {
    static async getOneGoodOplist(ctx, next) {
        const Oplist = mongoose.model('OpList');
        const goodId = ctx.query.id
        const ops = await Oplist.find({
            goodId: goodId
        }).sort({
            'meta.createdAt': -1
        })
        ctx.body = {
            ops
        }
    }
    /* 为单个商品添加一条操作记录 */
    static async addOneOp(data) {
        const Oplist = mongoose.model('OpList');
        return await Oplist.create({
            opType: data.opType, // 0为出库，1为入库
            opNum: data.opNum,
            afterOpNum: data.afterOpNum,
            note: data.note,
            goodId: data.goodId, // 所属商品的ID
        })
    }
    /* 删除某条记录 */
    static async delOp(ctx, next) {
        const Good = mongoose.model('Good');
        const id = ctx.request.body.id
        console.log(id);
        ctx.body = await Good.findByIdAndRemove({
            _id: id
        })
    }
}

module.exports = opListManager
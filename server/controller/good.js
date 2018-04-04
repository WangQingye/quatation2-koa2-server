const mongoose = require('mongoose')
const opManager = require('./oplist')
class GoodManager {
    static async getAllGoods(ctx, next) {
        const Good = mongoose.model('Good')
        const goods = await Good.find({}).sort({
            'meta.createdAt': -1
        })
        ctx.body = {
            goods
        }
    }
    static async addGood(ctx, next) {
        const Good = mongoose.model('Good');
        const Oplist = mongoose.model('OpList');
        console.log(ctx.request.body.name);
        if (!ctx.request.body.name) {
            ctx.body = {
                code: 333,
                msg: '商品不能没有名字哦'
            }
            return;
        }
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
        const d = ctx.request.body;
        ctx.body = await Good.create({
            category: d.category,
            name: d.name,
            format: d.format,
            nowStock: d.nowStock,
            price: d.price,
            note: d.note
        })
        /* 第一次添加商品的时候添加一条修改记录 */
        await opManager.addOneOp({
            name: d.name,
            opType: 1, // 0为出库，1为入库
            opNum: d.nowStock,
            afterOpNum: d.nowStock,
            note: '第一次添加入库',
            goodId: ctx.body._id, // 所属商品的ID
        })
    }
    static async delGood(ctx, next) {
        const Good = mongoose.model('Good');
        const id = ctx.request.body.id
        console.log(id);
        ctx.body = await Good.findByIdAndRemove({
            _id: id
        })
    }
    static async changeGood(ctx, next) {
        const Good = mongoose.model('Good');
        const d = ctx.request.body;
        if (!d.name) {
            ctx.body = {
                code: 333,
                msg: '商品不能没有名字哦'
            }
            return;
        }
        ctx.body = await Good.findByIdAndUpdate(d.id, {
            category: d.category,
            name: d.name,
            format: d.format,
            nowStock: d.nowStock,
            price: d.price,
            note: d.note
        })
    }
    /* 库存管理 */
    static async manageStock(ctx, next) {
        const Good = mongoose.model('Good');
        const d = ctx.request.body;
        /* 修改存库量 */
        await Good.findByIdAndUpdate(d.id, {
            nowStock: d.afterOpNum,
        })
        /* 添加操作记录 */
        ctx.body = await opManager.addOneOp({
            name: d.name,
            opType: d.opType, // 0为出库，1为入库
            opNum: d.opNum,
            afterOpNum: d.afterOpNum,
            note: d.note,
            goodId: d.id, // 所属商品的ID
        })
    }
}

module.exports = GoodManager
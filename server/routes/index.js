const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router()
const goodManager = require('../controller/good')

// router.get('/goods', async (ctx, next) => {
//     const Good = mongoose.model('Good')
//     const goods = await Good.find({}).sort({
//         'meta.createdAt': -1
//     })

//     ctx.body = {
//         goods
//     }
// })

router.get('/goods', goodManager.getAllGoods) // 获取所有商品
    .post('/goods', goodManager.addGood) // 添加商品
// .put('/goods/:id', goodManager.changeGood) //  修改单个商品的信息
// .get('/goods/record/:id', goodManager.getGoodRecord) // 获取单个商品的操作记录
// .post('/goods/record', goodManager.addGoodRecord) // 添加单个商品的操作记录（操作存库）

// router.get('/goods/:id', async (ctx, next) => {
//     const Good = mongoose.model('Good')
//     const id = ctx.params.id
//     const good = await Good.findOne({
//         _id: id
//     })

//     ctx.body = {
//         good
//     }
// })

module.exports = router
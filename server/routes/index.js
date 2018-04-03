const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router()

router.get('/goods/all', async (ctx, next) => {
    const Good = mongoose.model('Good')
    const goods = await Good.find({}).sort({
        'meta.createdAt': -1
    })

    ctx.body = {
        goods
    }
})

router.get('/goods/single/:id', async (ctx, next) => {
    const Good = mongoose.model('Good')
    const id = ctx.params.id
    const good = await Good.findOne({
        _id: id
    })

    ctx.body = {
        good
    }
})
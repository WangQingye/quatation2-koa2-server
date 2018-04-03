const Koa = require('koa')
const mongoose = require('mongoose')
const router = require('./routes')
/* 数据库连接 */
const {
    connect,
    initSchemas
} = require('./database/init');

(async () => {
    await connect()
    initSchemas()
    // const Good = mongoose.model('Good')
    // const goods = await Good.find({})
    // console.log(goods)
})()
const app = new Koa()
app.use(router.routes())
    .use(router.allowedMethods())
app.use(async (ctx, next) => {
    ctx.body = 'Hi Luke'
})

app.listen(2333);
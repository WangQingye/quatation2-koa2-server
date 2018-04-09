const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
/* 数据库连接 */
const {
    connect,
    initSchemas
} = require('./database/init')

;
(async () => {
    await connect()
    initSchemas()
})()
const router = require('./routes')
const app = new Koa()
app.use(bodyParser())
app.use(cors({
    origin: 'http://localhost:8080'
}))
app.use(router.routes())
    .use(router.allowedMethods())
app.use(async (ctx, next) => {
    ctx.body = 'Hi Luke'
})

app.listen(2333);
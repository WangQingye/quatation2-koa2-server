const Koa = require('koa')
const {
    connect
} = require('./database/init');
(async () => {
    await connect()
})()
const app = new Koa()

app.use(async (ctx, next) => {
    ctx.body = 'Hi Luke'
})

app.listen(2333);
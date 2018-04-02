const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    console.log(ctx.href);
    console.log(ctx.path);
    ctx.body = 'Hi Luke'
})

app.listen(2333);
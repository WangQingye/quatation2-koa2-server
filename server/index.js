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
    initSchemas()
    await connect()    
})()
const router = require('./routes')
const app = new Koa()
// app.use(async (ctx, next) => {
//     console.log(ctx.request)
// })
app.use(bodyParser())
app.use(cors({
    // 为什么直接返回字符串‘*’不行，非要用函数才行呢，此问题待解决
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return false;
        }
        return '*';
    },
}))
app.use(router.routes())
    .use(router.allowedMethods())

app.listen(2333);

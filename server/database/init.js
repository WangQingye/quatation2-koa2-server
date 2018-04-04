const mongoose = require('mongoose')
const db = 'mongodb://localhost/shunxin-goods'
const glob = require('glob')
const {
    resolve
} = require('path')

mongoose.Promise = global.Promise
exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.connect = () => {
    let maxConnectTimes = 0
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }
        mongoose.connect(db);
        mongoose.connection.on('disconnected', () => {
            maxConnectTimes++
            console.log('dasdas');
            if (maxConnectTimes < 5) {
                mongoose.connect(db);
            } else {
                throw new Error('数据库挂了')
            }
        })
        mongoose.connection.once('open', () => {
            console.log('Mongodb Connected successfully')
            resolve()
        })
        mongoose.connection.on('error', err => {
            reject(err)
            console.log(err);
        })
    })
}
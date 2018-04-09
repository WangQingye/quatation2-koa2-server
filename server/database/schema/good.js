/* 商品模型 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const goodSchema = new Schema({
    category: String,
    name: String,
    format: String,
    nowStock: Number,
    price: String,
    img: String,
    note: String,
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})
goodSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        console.log(123);
        this.meta.updatedAt = Date.now()
    }
    next()
})
mongoose.model('Good', goodSchema)
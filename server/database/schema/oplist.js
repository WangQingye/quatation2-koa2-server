/* 操作记录模型 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const opListSchema = new Schema({
    opType: Number,
    opNum: Number,
    afterOpNum: Number,
    note: String,
    goodId: String, // 所属商品的ID
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
opListSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})
mongoose.model('OpList', opListSchema)
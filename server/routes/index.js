const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router()
const goodManager = require('../controller/good')
const opManager = require('../controller/oplist')

router.get('/goods', goodManager.getAllGoods) // 获取所有商品
    .post('/goods', goodManager.addGood) // 添加商品
    .delete('/goods', goodManager.delGood) //  删除单个商品的信息
    .put('/goods', goodManager.changeGood) //  修改单个商品的信息
    .post('/goods/manage', goodManager.manageStock) // 添加单个商品的操作记录（操作存库）
    .get('/record/:id', opManager.getOneGoodOplist) // 获取单个商品的操作记录


module.exports = router
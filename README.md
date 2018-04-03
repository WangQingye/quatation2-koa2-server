# 库存管理Web端（quatation2-koa2-server）

### 数据结构

```
// 商品
{
  category: '管材'
  name: '二极管',
  format: 'm'
  nowStock: 200,
  price: 100,
  note: '备注'
}

// 记录
{
  name: '二极管',
  opType: 0,  // 0出库，1入库
  opNum: 200,
  afterOpNum: 100,
  note: '出售给某某公司',
  opDate: '2018-04-03'
}
```
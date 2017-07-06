const express=require('express');
const user=require('../model/user')
const goodsType=require('../model/goodsType')
const goodsAdd=require('../model/goodsAdd')
//路由模块
const router = express.Router();
router.post('/',(req,res)=>{
    //添加商品分类
    const goodstypeInfo=req.body
// console.log(goodstypeInfo)
    goodsType.findOne({goodsType:goodstypeInfo.goodsType}).then(function(result){
        console.log(result)
        if(result!=null){
            res.json({
                statusCode:0,
                msg:'分类已存在'
            })
        }else if(result===null){
            goodsType.create({goodsType:goodstypeInfo.goodsType}).then(function () {
                res.json({
                    statusCode:1,
                    msg:'分类添加成功'
                })
            })
        }
    })

})
//查询商品分类
router.get('/',(req,res)=>{
    goodsType.find().then(function(result){
        // console.log(result)
        res.json({
            goodstype:result
        })
    })
})
//删除商品分类
router.get('/good/remove',(req,res)=>{
    let type=req.query.type;
    // console.log(req.query)
    goodsType.remove({goodsType:type}).then(function (result) {
        res.redirect('/front#/goods_type')
    })
})
//添加商品
router.post('/goodsadd',(req,res)=>{
    // console.log(req.body)
    const goodsAddInfo=req.body
    goodsAdd.findOne({goods_add:goodsAddInfo.goods_add}).then(function(result){
        // console.log(result)
        if(result){
            res.json({
                statusCode:0,
                msg:'商品已存在'
            })
        }else {
            goodsAdd.create({type:goodsAddInfo.goodsType,goods_add:goodsAddInfo.goods_add,goods_price:goodsAddInfo.goods_price}).then(function () {
                res.json({
                    statusCode:1,
                    msg:'商品添加成功'
                })
            })
        }
    })
})
//查询所有的商品
router.get('/goodsall',(req,res)=>{
    goodsAdd.find().populate(['type']).then(function(result){
        // console.log(result)
        res.json({
            goodsAll:result
        })
    })
})
//删除商品
router.get('/remove',(req,res)=>{
    let goods=req.query.goods;
    // console.log(goods)
    goodsAdd.remove({goods_add:goods}).then(function(result){
        console.log()
        res.redirect('/front#/goods_manage')
    })
})
//修改商品
router.post('/edit',(req,res)=>{
    // console.log(req.body)
    let goods=req.body;
    goodsAdd.update({goods_add:goods.goods_add},{
        goods_price:goods.goods_price
    }).then(function (result) {
        if(result.ok){
            res.json({
                code:0,
                msg:'修改成功'
            })
        }else{
            res.json({
                code:1,
                msg:'修改失败'
            })
        }
    })

})
module.exports=router;
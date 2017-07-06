
const express=require('express');
const user=require('../model/user')
const storeType=require('../model/storeType')
const storeAdd=require('../model/storeAdd')
const goodsAdd=require('../model/goodsAdd')
//路由模块
const router = express.Router();
router.get('/',function(req,res){
    if(req.session.user){
        user.find().then(function(result){
            // console.log(result)
            res.render('front/Posindex',{
                user_login: req.session.user,
                userAll:JSON.stringify(result)
            })
        })
    }else{
        res.redirect("/login");
    }
})
    //获取店铺分类
router.get('/store',function(req,res){
    storeType.find().then(function(result){
        // console.log(result)
        res.json({
            storeAll:result
        })
    })
})
//删除店铺分类
router.get('/store/remove',(req,res)=>{
    let storetype=req.query;
    console.log(storetype)
    storeType.remove({storeType:storetype.storeType}).then(function(result){
        res.redirect('/front#/store_type')
    })
})

//获取所有店铺
router.get('/stores',function(req,res){
    storeAdd.find().populate(['type']).then(function(result){
        // console.log(result)
        res.json({
            storesAll:result
        })
    })
})
router.post('/',(req,res)=>{
    //添加店铺分类
    console.log(req.body)
    const storetypeInfo=req.body
    storeType.findOne({storeType:storetypeInfo.storeType}).then(function(result){
        // console.log(result)
        if(result){
            res.json({
                statusCode:0,
                msg:'分类已存在'
            })
        }else {
            storeType.create({storeType:storetypeInfo.storeType}).then(function () {
                res.json({
                    statusCode:1,
                    msg:'分类添加成功'
                })
            })
        }
    })
})
router.post('/storeadd',(req,res)=>{
    //添加店铺
    // console.log(req.body)
    const storeAddInfo=req.body
    storeAdd.findOne({store_add:storeAddInfo.store_add}).then(function(result){
        // console.log(result)
        if(result){
            res.json({
                statusCode:0,
                msg:'分类已存在'
            })
        }else {
            storeAdd.create({type:storeAddInfo.storeType,store_add:storeAddInfo.store_add}).then(function () {
                res.json({
                    statusCode:1,
                    msg:'分类添加成功'
                })
            })
        }
    })
})

//删除店铺
router.get('/remove',(req,res)=>{
    let store=req.query;
    // console.log(store)
    storeAdd.remove({store_add:store.store}).then(function(result){
        res.redirect('/front#/store_manage')
    })
})
//修改店铺
router.post('/edit',(req,res)=>{
    // let store=req.body;
    // console.log(req.body)
    storeAdd.update({
        storeType:req.body._id
    },{
        storeType:req.body.storeType,
        store_add:req.body.store_add
    }).then(function (result) {
        if(result.ok){
           res.json({
               code:0,
               msg:"修改成功"
           })
        }else{
            res.json({
                code:1,
                msg:"修改失败"
            })
        }
    })
})
module.exports=router;
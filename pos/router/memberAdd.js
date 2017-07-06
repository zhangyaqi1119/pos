
const express=require('express');
const members =require('../model/members')
//路由模块
const router = express.Router();
//添加会员
router.post('/',(req,res)=>{
    const membersInfo=req.body
// console.log(goodstypeInfo)
    members.findOne({member:membersInfo.memberAdd}).then(function(result){
        // console.log(result)
        if(result!=null){
            res.json({
                statusCode:0,
                msg:'分类已存在'
            })
        }else if(result===null){
            members.create({member:membersInfo.memberAdd}).then(function () {
                res.json({
                    statusCode:1,
                    msg:'分类添加成功'
                })
            })
        }

    })
})
//查询会员
router.get('/membersall',(req,res)=>{
    members.find().then(function(result){
        // console.log(result)
        res.json({
            membersall:result
        })
    })
})

//删除会员
router.get('/remove',(req,res)=>{
    let member=req.query.member;
    // console.log(member)
    members.remove({member:member}).then(function (result) {
        res.redirect('/front#/member_manage')
    })
})

//修改会员
router.post('/edit',(req,res)=>{
    console.log(req.body)
    members.update({
        _id:req.body._id
    },{
        _id:req.body._id,
        member:req.body.member,
        create_data:Date.now()
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
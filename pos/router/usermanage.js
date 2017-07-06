
const express=require('express');
const  crypto=require('crypto');
const User=require('../model/user')
//路由模块
const router = express.Router();
//删除用户
router.get('/remove',(req,res)=>{
    let user = req.query.user;
    console.log(user)
    User.remove({username:user}).then(function (result) {
        res.redirect('/front#/user_manage')
    })
})
// 修改用户资料
router.post('/edit',(req,res)=>{
    let user = req.body;
    let md5=crypto.createHash('md5');
    md5.update(user.password);
    let password=md5.digest('hex');
    // res.send(JSON.stringify(req))
    // console.log(user.username)
    User.update({
        username:user.username
    },{
        username:user.username,
        password:password,
        create_date:Date.now()
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
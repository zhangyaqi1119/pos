const express=require('express');
const  crypto=require('crypto');
//引入外部user模块
const user=require('../model/user')
//路由模块
const router = express.Router();
router.get('/',function(req,res){
    res.render('front/login')
})

router.post('/',function(req,res){
    let type=req.body;
    console.log(type)
    user.findOne({username:type.username}).then(function(result){
        // console.log(result)
        if(result){
            res.json({
                statusCode:0,
                msg:'账号已存在，请立即登录'
            })
        }else{
            //进行密码的加密
            var md5=crypto.createHash('md5');
            md5.update(type.password);
            var password=md5.digest('hex');
            // console.log(d)
            user.create({username:type.username,password:password}).then(function(){
                res.json({
                    statusCode:1,
                    msg:'账号添加成功'
                })
            })
        }
    })

})
module.exports=router;
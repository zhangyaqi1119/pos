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
 let useInfo=req.body;
 // console.log(useInfo)
    let username=useInfo.username;
    let md5=crypto.createHash('md5');
    md5.update(useInfo.password);
    let password=md5.digest('hex');
    // console.log(username,password)
    user.findOne({username:username,password:password}).then(function(result){
        // console.log(result)
        if(result){
            var user=result;
            req.session.user=user;
            res.json({
                statusCode:0,
                msg:'登录成功'
            })
        }else {
            res.json({
                statusCode:1,
                msg:'请检查账号和密码'
            })
        }
    })

})
module.exports=router;
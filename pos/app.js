//接口
//引入模块
const express=require("express");
const bodyParser=require('body-parser');
const session = require('express-session');
//引入外模块
// const user=require('./router/user')
// const admin=require('./router/admin')
const front=require('./router/front')
const goodstype=require('./router/goodstype')
const memberAdd=require('./router/memberAdd')
const usermanage=require('./router/usermanage')
const login=require('./router/login')
const register=require('./router/register')
const app=express();
//设置body-parser
app.use(bodyParser.urlencoded({extended:false}))
//设置模板引擎/
app.set('view engine','ejs');
//设置静态资源
app.use(express.static('public'));
app.use(session({
    secret: 'sessiontest',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));
app.use('/login',login)
app.use('/register',register)
//front路由
app.use('/front',front)
app.use('/goodstype',goodstype)
app.use('/memberAdd',memberAdd)
app.use('/usermanage',usermanage)
app.listen(3000);
//引入db
const mongoose=require('mongoose');
const db=require('./db');
//定义Schema结构
const date=new Date()
const nowTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+' '+date.getHours()+":"+date.getMinutes()
var membersSchema = mongoose.Schema({
    count:String,
    member:String,
    creat_data:{
        type:String,
        default:nowTime
    }
})

//将Schema发布模型
var membersModel=db.model('members',membersSchema);
module.exports=membersModel;

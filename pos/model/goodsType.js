//引入db
const mongoose=require('mongoose');
const db=require('./db');
//定义Schema结构
const date=new Date()
const nowTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+' '+date.getHours()+":"+date.getMinutes()
var goodsTypeSchema = mongoose.Schema({
    goodsType:String,
    creat_data:{
        type:String,
        default:nowTime
    }
})

//将Schema发布模型
var goodsTypeModel=db.model('goodsType',goodsTypeSchema);
module.exports=goodsTypeModel;

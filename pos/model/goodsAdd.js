//引入db
const mongoose=require('mongoose');
const db=require('./db');
//定义Schema结构
const date=new Date()
const nowTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+' '+date.getHours()+":"+date.getMinutes()
var goodsAddSchema = mongoose.Schema({
    //关联字段
    type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'goodsType'  //指定引用
    },
    goods_add:String,
    goods_price:String,
    creat_data:{
        type:String,
        default:nowTime
    }
})

//将Schema发布模型
var goodsAddModel=db.model('goodsAdd',goodsAddSchema);
module.exports=goodsAddModel;

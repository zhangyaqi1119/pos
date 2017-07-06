//引入db
const mongoose=require('mongoose');
const db=require('./db');
//定义Schema结构
const date=new Date()
const nowTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+' '+date.getHours()+":"+date.getMinutes()
var storeAddSchema = mongoose.Schema({
    //关联字段
    type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'storeType'  //指定引用
    },
    store_add:String,
    creat_data:{
        type:String,
        default:nowTime
    }
})

//将Schema发布模型
var storeAddModel=db.model('storeAdd',storeAddSchema);
module.exports=storeAddModel;

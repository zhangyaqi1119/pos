//引入db
const mongoose=require('mongoose');
const db=require('./db');
//定义Schema结构
var commoditySchema = mongoose.Schema({
    code:Number,
    name:String,
    creat_data:{
        type:Date,
        default:Date.now()
    }
})

//将Schema发布模型
var commodityModel=db.model('commodity',commoditySchema);
module.exports=commodityModel;

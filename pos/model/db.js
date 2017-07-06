const  mongoose=require('mongoose');
const db = mongoose.createConnection('localhost','pos');
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log("数据库已连接")
})
module.exports=db;
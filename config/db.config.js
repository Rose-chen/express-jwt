//连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test-node')
//插入集合和数据,数据库test-node会自动创建

//监听数据库连接状态
mongoose.connection.once('open',()=>{
  console.log('数据库连接成功……')
})
mongoose.connection.once('close',()=>{
  console.log('数据库断开……')
})
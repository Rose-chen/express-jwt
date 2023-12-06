const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserType = new Schema({
  username: String,
  password: String,
  age: Number
})
//数据字段可根据实际需求修改

const UserModel = mongoose.model('users', UserType)
//此处users名称需要跟数据库中对应集合名称一样

module.exports = UserModel

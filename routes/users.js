var express = require('express');
const UserModel = require('../models/userModel');
const JWT = require('../util/JWT');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async function(req, res, next) {
  // console.log(req)
  const { username, password } = req.body;
  const resp = await UserModel.find({ username, password})
  // 如果查询到数据，resp为对象数组
  if(resp.length) {
    const token = JWT.generator({
      id: resp[0]._id,
      username: resp[0].username,
    }, 30)
    console.log(token)
    res.header('Authorization', token)
    res.send({
      ok: 1
    })
  } else {
    res.send({
      ok: 0
    })
  }
})

/** 新增 */
router.post('/user', async function(req, res, next) {
  // console.log(req)
  const { username, password, age } = req.body;
  const resp = await UserModel.create({ username, password, age , sex: 1})
  console.log(resp)
  if(resp) {
    res.send({ok:1})
  } else {
    res.send({ok:0})
  }
});

/** 查询 */
router.get('/user', async function(req, res, next) {
  const { page, limit } = req.query;
  const resp = await UserModel.find({}, ['username', 'age']).sort({age: -1}).skip((page-1)*limit).limit(page*limit)
  res.send(resp)
});

module.exports = router;

const jwt = require('jsonwebtoken')
const secret = 'chen-anydata'
const JWT = {
  generator(data, expries) {
    return jwt.sign(data, secret, {expiresIn: expries})
  },
  verify(data) {
    return jwt.verify(data, secret)
  }
}

module.exports = JWT
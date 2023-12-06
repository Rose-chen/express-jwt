var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
const JWT = require('./util/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)//支持直接渲染html

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置中间件，校验token
app.use((req, res, next) => {
  if(req.path.includes('/login') || !req.path.includes('/api')) {
    next()
    return
  }

  const token = req.headers['authorization']
  if(token) {
    try {
      const payload = JWT.verify(token)
      console.log('payload',payload)
      if(payload) {
        const newtoken = JWT.generator({
          id: payload._id,
          username: payload.username,
        }, 30)
        res.header('Authorization', newtoken)
        next()
      } else {
        res.status(401).send({errCode: -1, errMsg: 'token过期'})
      }
    } catch {
      res.status(401).send({errCode: -1, errMsg: 'token过期'})
    }
  } else {
    res.status(401).send({errCode: -1, errMsg: 'token过期'})
    // next()
  }
})

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

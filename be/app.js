//---------------------------------------------------
// Packages
//---------------------------------------------------
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors') // 상단 아무곳이나 추가
var favicon = require('serve-favicon');
var history = require('connect-history-api-fallback');
var mongoose = require('mongoose');

//---------------------------------------------------
// Config
//---------------------------------------------------
var cfg = require('../config')
//---------------------------------------------------
// Models
//---------------------------------------------------
var User = require('./models/users');

//---------------------------------------------------
// Routers
//---------------------------------------------------
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');



//===================================================
// [S] Express
//===================================================
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//---------------------------------------------------
// DB Connection
//---------------------------------------------------
mongoose.connect(cfg.dbUrl, {useNewUrlParser: true}, (err)=> {
  if (err) return console.log(err);
  // console.log("mongoose connected!");
  // Creating User('Ji cheol')
  // User.create({ name: 'Ji cheol' })
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err))
  //
  // User.find(function (err, user) {
  //   if (err) return console.error(err);
  //   console.log(user);
  // });
  //
  // User.find()
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err));

});


if (process.env.NODE_ENV != 'production') app.use(cors()) // api 위에서 사용하겠다고 선언

//app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use(history());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

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


//===================================================
// [E] Express
//===================================================
module.exports = app;

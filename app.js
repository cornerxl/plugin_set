var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./server/index');
var down = require('./server/api/down');
var imgs=require("./server/api/imgs");
var post=require("./server/api/post");
var json=require("./server/api/json");
var app = express();
//post中间模块
var multer= require("connect-multiparty");
var muli=multer();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(muli);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/plugin_set/public", express.static(path.join(__dirname, 'public')));
//get获取数据
app.use('/', index);
app.use('/api/down',down);
app.use('/api/imgs',imgs);
app.use('/api/json',json);
//post获取数据
app.use("/api/post",post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;

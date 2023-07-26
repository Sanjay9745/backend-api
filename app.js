var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var clientRouter = require('./routes/client');
var adminRouter = require('./routes/admin');

//mongo db connect
var mongoDB = require('./db/config')
mongoDB
var app = express();

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Serve static images from the public folder folder
app.use('/logo', express.static(path.join(__dirname, 'logo')));
app.use('/userImage', express.static(path.join(__dirname, 'userImage')));
app.use('/coverImage', express.static(path.join(__dirname, 'userCoverImage')));
app.use('/productImage', express.static(path.join(__dirname, 'productImage')));

app.use('/api', clientRouter);
app.use('/admin', adminRouter);

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
  res.send({error : err.message});
});


module.exports = app;

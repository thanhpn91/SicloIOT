var express = require('express')
, exphbs = require('express-handlebars')
, path = require('path')
, favicon = require('serve-favicon')
, logger = require('morgan')
, cookieParser = require('cookie-parser')
, bodyParser = require('body-parser')
, mongoose = require('mongoose')
, routes = require('./routes/index')
, users = require('./routes/users')
, sensors = require('./routes/sensors')

, app = express();
var sensorIO = {
  io: require('./routes/sensors')
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/sensors', sensors);

// setting socket.io

//Connect to your database using the MONGO_URL environment variable.
process.env.MONGO_URL = 'mongodb://localhost:27017/data/db/data'

// start HTTP server 
require('start-express-mongoose').start(app)
.then(function(mongoose){/* success */})
.fail(function(err) { /* error */ });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

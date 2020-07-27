var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var inspaceProductRouter = require('./routes/inspaceproduct.route');
var licensedProductRouter = require('./routes/licensedproduct.route');
var pcRouter = require('./routes/pc.route');
var serverRouter = require('./routes/server.route');
var accountRouter = require('./routes/account.route');
var userRouter = require('./routes/user.route');
var sessionRouter = require('./routes/session.route');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);


var cors = require('cors')

var app = express();

app.use(session({
  secret: 'asdf3234sdf@#%^@sdfa234ws3s3',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'inems',
    password: 'inems',
    database: 'inems'
  })
}));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// const corsOpt = function(req, callbank) {
//   callbank(null, {origin: true});
// };


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/session', sessionRouter);
app.use('/api/inspace-products', inspaceProductRouter);
app.use('/api/licensed-products', licensedProductRouter);
app.use('/api/pcs', pcRouter);
app.use('/api/servers', serverRouter);
app.use('/api/users', userRouter);
app.use('/api/accounts', accountRouter);
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

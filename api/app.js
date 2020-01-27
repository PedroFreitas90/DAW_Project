var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

/****************************
 * MONGO CONNECTION
 ****************************/
const DATABASE_NAME = 'ISN';

mongoose.connect('mongodb://127.0.0.1:27017/' + DATABASE_NAME, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to Mongo at [${DATABASE_NAME}] database...`))
  .catch((erro) => console.log(`Mongo: Error connecting to [${DATABASE_NAME}]: ${erro}`))

/****************************
 * ROUTERS
 ****************************/

var utilizadoresRouter = require('./routes/utilizadores');
var gruposRouter = require('./routes/grupos');
var publicacoesRouter = require('./routes/publicacoes');

/****************************
 * AUTHENTICATION [JWT]
 ****************************/
var passport = require('passport')
var JWTStrategy = require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt

var extractFromQS = function (req) {
  var token = null
  if (req.query && req.query.token) token = req.query.token
  return token
}

var extractFromBody = function (req) {
  var token = null
  if (req.body && req.body.token) token = req.body.token
  return token
}

passport.use(new JWTStrategy({
  secretOrKey: 'isn2020',
  jwtFromRequest: ExtractJWT.fromExtractors([extractFromQS, extractFromBody])
}, async (payload, done) => {
  try {
    return done(null, payload)
  }
  catch (error) {
    return done(error)
  }
}))

/****************************
 * MIDDLEWARE
 ****************************/

var app = express();
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/****************************
 * ROUTES
 ****************************/

app.use('/utilizadores', utilizadoresRouter);
app.use('/grupos',gruposRouter);
app.use('/publicacoes',publicacoesRouter);

/****************************
 * ERROR HANDLERS
 ****************************/
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;

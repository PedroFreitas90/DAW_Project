var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Módulos de suporte à autenticação
var uuid = require('uuid/v4')
var session = require('express-session')
var LokiStore = require('connect-loki')(session);

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var axios = require('axios')
var flash = require('connect-flash')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var fs = require('fs')
//-----------------------------------

/****************************
 * AUTHENTICATION 
 ****************************/

// Configuração da estratégia local
passport.use(new LocalStrategy(
  { usernameField: 'numAluno' }, (numAluno, password, done) => {
    var token = jwt.sign({}, "isn2020",
      {
        expiresIn: 3000,
        issuer: "FrontEnd ISN"
      })
    axios.get('http://localhost:5003/utilizadores/' + numAluno + '?token=' + token)
      .then(dados => {
        const user = dados.data
        if (!user) { return done(null, false, { message: 'Utilizador inexistente!\n' }) }
        if (!bcrypt.compareSync(password, user.password)) { return done(null, false, { message: 'Password inválida!\n' }) }
        return done(null, user)
      })
      .catch(erro => done(erro))
  }))



// Indica-se ao passport como serializar o utilizador
passport.serializeUser((user, done) => {
  console.log('Vou serializar o user: ' + JSON.stringify(user))
  // Serialização do utilizador. O passport grava o utilizador na sessão aqui.
  done(null, user.numAluno)
})

// Desserialização: a partir do id obtem-se a informação do utilizador
passport.deserializeUser((numAluno, done) => {
  var token = jwt.sign({}, "isn2020",
    {
      expiresIn: 3000,
      issuer: "Servidor myAgenda"
    })
  console.log('Vou desserializar o utilizador: ' + numAluno)
  axios.get('http://localhost:5003/utilizadores/' + numAluno + '?token=' + token)
    .then(dados => done(null, dados.data))
    .catch(erro => done(erro, false))
})

/****************************
 * ROUTERS
 ****************************/

var gruposRouter = require('./routes/grupos')
var publicacoesRouter = require('./routes/publicacoes')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


/****************************
 * MIDDLEWARE [JWT]
 ****************************/

var app = express();

// view engine setup
app.set('views',
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/elements'),
  path.join(__dirname, 'views/layouts'),
  path.join(__dirname, 'views/modals'),
  path.join(__dirname, 'views/pages')
);
app.set('view engine', 'pug');

app.use(session({
  genid: req => {
    console.log('Dentro do middleware da sessão...')
    console.log(req.sessionID)
    return uuid()
  },
  store: new LokiStore({ path: './sessions/sessions.db' }),
  secret: 'daw2019',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/****************************
 * ROUTES
 ****************************/
app.use('/grupos', gruposRouter);
app.use('/publicacoes', publicacoesRouter)
app.use('/perfil', usersRouter);
app.use('/', indexRouter);


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
  res.render('error');
});

module.exports = app;

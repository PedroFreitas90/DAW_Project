var express = require('express');
var router = express.Router();
var axios = require('axios')
var passport = require('passport')
var bcrypt = require('bcryptjs')
const fs = require('fs')
var Ficheiro = require('../models/ficheiros')
var multer = require('multer')
var upload = multer({dest:'uploads/'})
var jwt = require('jsonwebtoken')

var token = jwt.sign({}, "isn2019", 
    {
        expiresIn: 3000, 
        issuer: "Servidor myAgenda"
    })

    router.get('/', function(req,res){
      res.render('login')
    })
    

   router.get('/feed',verificaAutenticacao,function(req,res){  
    var numAluno =req.session.passport.user
     axios.get('http://localhost:5003/publicacoes')
        .then(dados1 =>{
          axios.get('http://localhost:5003/grupos/')
          .then(dados2 =>{
            axios.get('http://localhost:5003/utilizadores/info/'+numAluno)
            .then(dados3 => res.render('feed',{ publicacoes:dados1.data, grupos : dados2.data , lista:dados3.data}))// falta a view do feed
          })
        })
        .catch(e=>res.render('error',{error:e}))
   }) 

router.get('/logout', verificaAutenticacao, function(req,res){
  req.logout()
  res.redirect('/')
})


router.get('/login', function(req,res){
  res.render('login')
})

router.get('/register', function(req,res){
  res.render('registo')
})

router.post('/login', passport.authenticate('local', 
  {
    failureRedirect: '/login',
    failureFlash: 'Utilizador ou password inválido(s)...'
  }),function(req, res) {
    console.log(req.body.numAluno);
    if(req.isAuthenticated(req, res)) {
        res.redirect('/feed');
    } 
}

)

router.post('/reg',upload.single('imagem'), function(req,res){
  let oldPath = __dirname + '/../' + req.file.path
  let newPath = __dirname + '/../public/ficheiros/' + req.file.originalname
 
  fs.rename(oldPath, newPath, function(err){ //mexer ficheiro da cache para public/ficheiros
    if(err) throw err
  })

  let novoFicheiro = new Ficheiro({
    desc: req.body.desc,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  })

  var hash = bcrypt.hashSync(req.body.password, 10);
  axios.post('http://localhost:5003/utilizadores', {
    numAluno: req.body.numAluno,
    nome: req.body.nome,
    password: hash,
    foto : novoFicheiro
  })
    .then(dados => res.redirect('/login'))
    .catch(e => res.render('error', {error: e}))
})


router.get('/:numAluno', verificaAutenticacao, function(req, res) {
  axios.get('http://localhost:5003/utilizadores/' + req.params.numAluno + '?token=' + token)
    .then(dados => res.render('perfil', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});


function verificaAutenticacao(req,res,next){
  if(req.isAuthenticated()){
  //req.isAuthenticated() will return true if user is logged in
    next();
  } else{
    res.redirect("/login");}
}



module.exports = router;

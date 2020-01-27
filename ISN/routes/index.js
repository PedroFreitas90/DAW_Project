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
var nanoid = require('nanoid')
var path = require('path')

function geratoken(req,res,next){
  var token = jwt.sign({}, "isn2020", {
        expiresIn: 3000, 
        issuer: "FrontEnd ISN"
    })
  return token;
}

    router.get('/',alreadyAutenticado, function(req,res){
      res.render('pages/login')
    })
    

   router.get('/feed',verificaAutenticacao,function(req,res){
     console.log(req.session.passport.user)
    var numAluno =req.session.passport.user
    var token = geratoken()
     axios.get('http://localhost:5003/publicacoes?grupo=feed&token='+token)
        .then(dados1 =>{
          axios.get('http://localhost:5003/grupos?token='+token)
          .then(dados2 =>{
            axios.get('http://localhost:5003/utilizadores/info/'+numAluno+'?token='+token)
            .then(dados3 => res.render('pages/homepage',{ publicacoes:dados1.data, grupos : dados2.data , utilizador:dados3.data}))// falta a view do feed
          })
        })
        .catch(e=>res.render('error',{error:e}))
   }) 

router.get('/logout', verificaAutenticacao, function(req,res){
  req.logout()
  res.redirect('/')
})


router.get('/login',alreadyAutenticado, function(req,res){
  res.render('pages/login')
})

router.get('/register', function(req,res){
  res.render('pages/registo')
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
  var id = nanoid()
  var extension = path.extname(req.file[i].originalname)
  let oldPath = __dirname + '/../' + req.file.path
  let newPath = __dirname + '/../public/ficheiros/'+ id +extension
 
  fs.rename(oldPath, newPath, function(err){ //mexer ficheiro da cache para public/ficheiros
    if(err) throw err
  })

  let novoFicheiro = new Ficheiro({
    name: id+extension,
    mimetype: req.file.mimetype,
    size: req.file.size,
    originalName:req.file.originalname
  })

  var hash = bcrypt.hashSync(req.body.password, 10);
  console.log(req.body)
  console.log(hash)
  console.log(novoFicheiro)
  axios.get('http://localhost:5003/utilizadores/utilizador?numAluno='+req.body.numAluno+'&email='+req.body.email)
  .then(dados => {
    console.log(dados.data)
    if (dados.data.length>0){
      console.log("Já existe")
      res.redirect('/welelele') //adicionar front end para aparecer um aviso 
    }
    else {
      axios.post('http://localhost:5003/utilizadores', {
      numAluno: req.body.numAluno,
      nome: req.body.nome,
      email: req.body.email,
      password: hash,
      foto : novoFicheiro
    })
      .then(dados => res.redirect('/login'))
      .catch(e => res.render('error', {error: e}))
    }
    })
})


router.get('/:numAluno', verificaAutenticacao, function(req, res) {
  axios.get('http://localhost:5003/utilizadores/' + req.params.numAluno + '?token=' + token)
    .then(dados => res.render('perfil', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

function alreadyAutenticado(req,res,next){
  if(req.isAuthenticated()){
    res.redirect("/feed")
  }
  else{
    next();
  }
}

function verificaAutenticacao(req,res,next){
  if(req.isAuthenticated()){
  //req.isAuthenticated() will return true if user is logged in
    next();
  } else{
    res.redirect("/login");}
}



module.exports = router;

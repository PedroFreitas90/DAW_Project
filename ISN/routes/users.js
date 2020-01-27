var express = require('express');
var axios = require('axios');
var router = express.Router();
const fs = require('fs')
var Ficheiro = require('../models/ficheiros')
var multer = require('multer')
var upload = multer({dest:'uploads/'})
var nanoid = require('nanoid')
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/',verificaAutenticacao, function(req, res, next) {
  axios.get('http://localhost:5003/utilizadores/info/'+req.user.numAluno)
  .then(dados1 =>{
        axios.get('http://localhost:5003/grupos/numAluno?numAluno='+req.user.numAluno )
        .then(dados2 => {
          axios.get('http://localhost:5003/publicacoes?numAluno='+req.user.numAluno)
          .then(dados3 => {
            res.render('pages/perfil',{ utilizador:dados1.data, grupos : dados2.data , publicacoes:dados3.data})})
        })
  })
  .catch(e=>res.render('error',{error:e}))
});

router.post('/checkPassword',verificaAutenticacao,function(req,res){
  axios.get('http://localhost:5003/utilizadores/'+req.user.numAluno + '?password=' + req.body.passwordAntiga)
  .then(dados => {
    console.log(dados.data)
    if(dados.data.length==0){
      res.jsonp( {
        password : false
      })
    }
    else{ 
      res.jsonp({
        password : true
      })
    }

 })
})



router.get('/:idUser',verificaAutenticacao,function(req,res,next){
  axios.get('http://localhost:5003/utilizadores/info/'+req.params.idUser)
  .then(dados1 =>{
        axios.get('http://localhost:5003/grupos/numAluno?numAluno='+req.params.idUser+"&grupos=publico" )
        .then(dados2 => {
          axios.get('http://localhost:5003/publicacoes?numAluno='+req.params.idUser)
          .then(dados3 => {
            res.render('pages/perfil',{ utilizador:dados1.data, grupos : dados2.data , publicacoes:dados3.data})})
        })

        })
})


 

router.post('/editar', upload.single('imagem'),verificaAutenticacao,function(req,res){
  var id = nanoid()
  var hashNova = bcrypt.hashSync(req.body.password, 10);
  var body = {
    numAluno: req.user.numAluno,
        nome: req.body.nome,
        password: hashNova,
        bio : req.body.bio,
        email: req.body.email,
        website : req.body.website,
  }
  if(req.file){
  let oldPath = __dirname + '/../' + req.file.path
  let newPath = __dirname + '/../public/ficheiros/'+id
 
  fs.rename(oldPath, newPath, function(err){ //mexer ficheiro da cache para public/ficheiros
    if(err) throw err
  })

  let novoFicheiro = new Ficheiro({
    name: id,
    mimetype: req.file.mimetype,
    size: req.file.size
  })
  body.foto=novoFicheiro
}
 
      axios.put('http://localhost:5003/utilizadores',body )
      .then(dados => res.redirect('/feed'))
      .catch(e => res.render('error', {error: e}))
})


function verificaAutenticacao(req,res,next){
  if(req.isAuthenticated()){
  //req.isAuthenticated() will return true if user is logged in
    next();
  } else{
    res.redirect("/login");}
}

module.exports = router;

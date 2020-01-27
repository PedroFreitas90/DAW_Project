var express = require('express');
var router = express.Router();
var Grupos = require('../controllers/grupos')
var Publicacoes = require('../controllers/publicacoes')
var Utilizador = require('../models/utilizadores')
var passport = require('passport')
var nanoid = require('nanoid')
var bcrypt= require('bcryptjs')
var passport = require('passport')

/* GET users listing. */
router.get('/',passport.authenticate('jwt',{session: false}), function(req, res) {
  Grupos.listar()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.get('/numAluno',passport.authenticate('jwt',{session: false}),function(req,res){
  if(req.query.grupos){
    Grupos.consultarGruposPublicosAluno(req.query.numAluno)
    .then(dados => res.jsonp(dados) )
    .catch(e => res.status(500).jsonp(e))
  }
  else {
    Grupos.consultarGruposAluno(req.query.numAluno)
    .then(dados => res.jsonp(dados) )
    .catch(e => res.status(500).jsonp(e)) 
  } 
})

router.get('/password',passport.authenticate('jwt',{session: false}),function(req,res){
  Grupos.consultar(req.body.idGrupo)
  .then(dados =>{
    if(bcrypt.compareSync(req.query.password,dados.passwor))
      res.jsonp(dados)
    else
    res.jsonp([])  
  })
  .catch(e => res.status(500).jsonp(e))
})

router.get('/:idGrupo',passport.authenticate('jwt',{session: false}), function(req, res) {
  if(req.query.numAluno){
  Grupos.filtrarParticipante(req.query.numAluno,req.params.idGrupo)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
  }
  else{
    Grupos.consultar(req.params.idGrupo)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
    }  
});

router.get('/:idGrupo/publicacoes',passport.authenticate('jwt',{session: false}),function(req,res){
  Publicacoes.publicacoesPorGrupo(req.params.idGrupo)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).json(e))
})

router.post('/',passport.authenticate('jwt',{session: false}), function(req,res){
 var admin = {
    numAluno : req.body.numAluno,
    nome : req.body.nomeUtilizador,
    }

 var body = {
  id : nanoid(),
  admin : admin,     
  nome : req.body.nomeGrupo,
  password: req.body.password,
  tipo: req.body.tipo,
  fotoGrupo : req.body.fotoGrupo,
  utilizadores: [admin],
 }   
  Grupos.inserir(body)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
  
})



router.post('/utilizador',passport.authenticate('jwt',{session: false}),function(req,res){
   var utilizador ={
    numAluno : req.body.numAluno,
    nome :  req.body.nome,
    foto : req.body.foto
  }
  Grupos.adicionarUtilizador(req.body.idGrupo,utilizador)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
 })

 router.post('/publicacao',passport.authenticate('jwt',{session: false}),function(req,res){

  var body = req.body
  var data =  new Date();
  body.id = nanoid()
  body.ficheiros.forEach( a => {
    a.data=data;
  })
  body.data = data;
  Grupos.adicionarPublicacao(req.body.idGrupo,utilizador)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))

 })



module.exports = router;

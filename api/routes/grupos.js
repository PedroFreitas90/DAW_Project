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
router.get('/',/*passport.authenticate('jwt',{session: false}),*/ function(req, res) {
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

router.get('/top10',passport.authenticate('jwt',{session :false}),function(req,res){
  Grupos.top10()
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
})



router.get('/password',passport.authenticate('jwt',{session: false}),function(req,res){
  console.log(req.query)
  Grupos.consultar(req.query.idGrupo)
  .then(dados =>{
      console.log(dados)
    if(bcrypt.compareSync(req.query.password,dados[0].password))
      res.jsonp(dados)
    else
    res.jsonp([])  
  })
  .catch(e => res.status(500).jsonp(e))
})

router.get('/:idGrupo',/*passport.authenticate('jwt',{session: false}),*/ function(req, res) {
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
  }
  Grupos.adicionarUtilizador(req.body.idGrupo,utilizador)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
 })



 router.delete('/sair',passport.authenticate('jwt',{session : false}),function(req,res){
  console.log(req.body)
   Grupos.eliminarUtilizadorGrupo(req.query.idGrupo,req.query.numAluno)
   .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
 })

 router.put('/:idGrupo',passport.authenticate('jwt',{session : false}),function(req,res){  
    if(req.body.password!= ""){
    var hashNova = bcrypt.hashSync(req.body.password, 10);
    body.password = hashNova
 Grupos.updateComPassword(req.param.idGrupo,req.body)
 .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
  }
 else{
   Grupos.updateSemPassword(req.params.idGrupo,req.body)
   .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
 }
})


module.exports = router;

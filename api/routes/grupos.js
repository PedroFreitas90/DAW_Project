var express = require('express');
var router = express.Router();
var Grupos = require('../controllers/grupos')
var Utilizador = require('../models/utilizadores')
var passport = require('passport')
var nanoid = require('nanoid')

/* GET users listing. */
router.get('/', function(req, res) {
  Grupos.listar()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.get('/numAluno',function(req,res){
    Grupos.consultarGruposAluno(req.query.numAluno)
    .then(dados => res.jsonp(dados) )
    .catch(e => res.status(500).jsonp(e))  
})

router.get('/password',function(req,res){
  Grupos.verificaPassword(req.query.idGrupo,req.query.password)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
})

router.get('/:idGrupo', function(req, res) {
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

router.post('/', function(req,res){
 var admin = {
    numAluno : req.body.numAluno,
    nome : req.body.nomeUtilizador,
    foto : req.body.fotoUtilizador,
      }

 var body = {
  id : nanoid(),
  admin : admin,     
  nome : req.body.nomeGrupo,
  password: req.body.password,
  tipo: req.body.tipo,
  utilizadores: [admin]
 }   
  Grupos.inserir(body)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
  
})



router.post('/utilizador',function(req,res){
   var utilizador ={
    numAluno : req.body.numAluno,
    nome :  req.body.nome,
    foto : req.body.foto
  }
  Grupos.adicionarUtilizador(req.body.idGrupo,utilizador)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
 })

 router.post('/publicacao',function(req,res){

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

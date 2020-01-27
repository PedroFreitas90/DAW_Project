var express = require('express');
var router = express.Router();
var Utilizadores = require('../controllers/utilizadores')
var passport = require('passport')
var bcrypt = require('bcryptjs')

/* GET users listing. */
router.get('/', function(req, res) {
  Utilizadores.listar()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});



router.get('/info/:numAluno',function(req,res){
  Utilizadores.consultar(req.params.numAluno)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
});

router.get('/utilizador',function(req,res){
  if(req.query.numAluno && req.query.email)
    Utilizadores.verificarUtilizador(req.query.numAluno,req.query.email)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).jsonp(e))
})

router.get('/:numAluno', function(req, res) {
 
  if(req.query.password) {
  Utilizadores.consultar(req.params.numAluno)
    .then(dados => {
      if (bcrypt.compareSync(req.query.password, dados.password))
      res.jsonp(dados)
      else 
      res.jsonp([])
    })
    .catch(e => res.status(500).jsonp(e))
  } 
  
  else {
  Utilizadores.consultar(req.params.numAluno)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
  }
});

router.post('/', function(req,res){
  Utilizadores.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
})


router.put('/',function(req,res){
 Utilizadores.updateUtilizadores(req.body.numAluno,req.body)
 .then(dados => res.jsonp(dados))
.catch(e => res.status(500).jsonp(e))
})
    

module.exports = router;

var express = require('express');
var router = express.Router();
var Utilizadores = require('../controllers/utilizadores')
var passport = require('passport')

/* GET users listing. */
router.get('/', passport.authenticate('jwt',{session: false}), function(req, res) {
  Utilizadores.listar()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});


router.get('/info/:numAluno',passport.authenticate('jwt',{session: false}),function(req,res){
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
  Utilizadores.consultarPassword(req.params.numAluno,req.query.password)
  .then(dados => res.jsonp(dados))
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
  console.log(req.body)
})

module.exports = router;

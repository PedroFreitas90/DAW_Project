var express = require('express');
var router = express.Router();
var Grupos = require('../controllers/grupos')
var passport = require('passport')

/* GET users listing. */
router.get('/', function(req, res) {
  Grupos.listar()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.get('/:idUtilizador', function(req, res) {
  console.log('')
  Grupos.filtrarParticipante(req.params.idUtilizador)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.post('/', function(req,res){
  Grupos.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
})

module.exports = router;

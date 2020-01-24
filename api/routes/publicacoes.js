var express = require('express');
var router = express.Router();
var Pubs = require('../controllers/publicacoes')

/* GET users listing. */
router.get('/', function(req, res) {
  if(req.query.autor){
    Pubs.filtrarAutor(req.query.autor)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).jsonp(e))
  }
  else{
    Pubs.listar()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).jsonp(e))
  } 
});


router.get('/:id', function(req, res) {
  Pubs.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});


router.post('/', function(req,res){
  Pubs.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
})

module.exports = router;
var express = require('express');
var router = express.Router();
var Eventos = require('../controllers/eventos')
var passport = require('passport')

/* GET users listing. */
router.get('/',passport.authenticate('jwt',{session: false}), function(req, res) {
  if(req.query.participante){
    Eventos.filtrarParticipante(req.query.participante)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).jsonp(e))
  }
  else{
    Eventos.listar()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).jsonp(e))
  } 
});

router.get('/:id',passport.authenticate('jwt',{session: false}), function(req, res) {
  Eventos.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

module.exports = router;
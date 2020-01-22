var express = require('express');
var router = express.Router();
var Grupos = require('../controllers/grupos')
var passport = require('passport')

/* GET users listing. */
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res) {
  Grupos.listar()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.get('/:idGrupo', passport.authenticate('jwt', {session: false}), function(req, res) {
  Grupos.consultar(req.params.idGrupo)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.post('/', function(req,res){
  Grupos.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
})

module.exports = router;

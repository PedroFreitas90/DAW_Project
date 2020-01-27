var express = require('express');
var router = express.Router();
var Pubs = require('../controllers/publicacoes')
var nanoid = require('nanoid');
var passport = require('passport')

/* GET users listing. */
router.get('/',passport.authenticate('jwt',{session: false}), function(req, res) {
  if(req.query.numAluno){
    Pubs.filtrarAutor(req.query.numAluno)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).jsonp(e))
  }
  else if (req.query.grupo){
    Pubs.filtrarGrupo(req.query.grupo)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
  }  
   else {Pubs.listar()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).jsonp(e))
  } 
});


router.get('/gostos/:id',passport.authenticate('jwt',{session: false}),function(req, res) {
  Pubs.publicacaoGostos(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
})

router.get('/comentarios/:id',passport.authenticate('jwt',{session: false}), function(req, res) {
  Pubs.publicacaoComentarios(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});


router.get('/:id',passport.authenticate('jwt',{session: false}), function(req, res) {
  Pubs.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});





router.post('/',passport.authenticate('jwt',{session: false}), function(req,res){
 
  var gostos = {
    numero : 0,
    users : []
  }
  var body = req.body
  var data =  new Date();
  body.id = nanoid()
  body.ficheiros.forEach( a => {
    a.data=data;
  })
  body.data = data;
  body.gostos = gostos
  body.group_id = "feed"
  
  Pubs.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))    
})


router.post('/comentario/gosto',passport.authenticate('jwt',{session: false}),function(req,res){

  Pubs.verificaGostoComentario(req.body.idPublicacao,req.body.idComentario,req.body.user)
  .then(dados =>{
    if(dados.length==0){
      Pubs.adicionarComentarioGosto(req.body.idPublicacao,req.body.idComentario,req.body.user)
      .then(dados2  => res.jsonp(dados2))
      .catch(e => res.status(500).jsonp(e))
    }
  } )
  .catch(e => res.status(500).jsonp(e))
})




router.post('/comentario/:idPublicacao',passport.authenticate('jwt',{session: false}),function(req,res){
  var gostos = {
    numero : 0,
    users : []
  }
  var body = req.body
  var data =  new Date();
  body.id = nanoid()
  body.ficheiros.forEach( a => {
    a.data=data;
  })
  body.data = data;
  body.gostos = gostos
  Pubs.adicionarComentario(req.params.idPublicacao,body)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))  
})


router.post('/gosto',passport.authenticate('jwt',{session: false}),function(req,res){
  Pubs.verificaGosto(req.body.idPublicacao,req.body.user)
  .then(dados =>{
    console.log(dados)
    if(dados.length==0){
      console.log('-----------------------')
      Pubs.adicionarGosto(req.body.idPublicacao,req.body.user)
      .then(dados2  => {
        console.log(dados2)
        res.jsonp(dados2)})
      .catch(e => res.status(500).jsonp(e))
    }
    else {
      Pubs.removeGosto(req.body.idPublicacao,req.body.user)
      .then(dados2  => res.jsonp(dados2))
      .catch(e => res.status(500).jsonp(e))
    }
  } )
  .catch(e => res.status(500).jsonp(e))
})

router.post('/:idGrupo',passport.authenticate('jwt',{session: false}),function(req,res){
  var gostos = {
    numero : 0,
    users : []
  }
  var body = req.body
  var data =  new Date();
  body.id = nanoid()
  body.ficheiros.forEach( a => {
    a.data=data;  
  })
  body.data = data;
  body.gostos = gostos;
  body.group_id=req.params.idGrupo
  Pubs.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e)) 
})

router.delete('/:id', function(req, res) {
  console.log(req.body.user_id)
  Pubs.consultar(req.params.id)
    .then(dados => {
      console.log((dados[0].user_id == req.body.user_id))
      if(dados[0].user_id == req.body.user_id)
        Pubs.removerPublicacao(req.params.id)
          .then(dados1=>res.jsonp(dados1))
          .catch(e => res.status(500).jsonp(e))
    })
    .catch(e => res.status(500).jsonp(e))
});

module.exports = router;
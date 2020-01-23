var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', verificaAutenticacao, function(req,res){
    axios.get('http://localhost:5003/grupos?token='+token)
    .then(dados => res.render('grupos', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
})

router.get('/:idGrupo',verificaAutenticacao, function(req,res){
    axios.get('http://localhost:5003/grupos/'+req.params.idGrupo) 
    .then(dados => res.render('index', {lista: dados.data}))// colocar view de um grupo
    .catch(e => res.render('error', {error: e}))
})

   


router.post('/',verificaAutenticacao, function(req,res){
    axios.post('http://localhost:5003/grupos',{
        admin : req.params.numAluno,
        nome: req.params.numAluno,
        password: req.body.password,
        tipo: req.body.tipo // privado ou publico   
    })
    .then(dados=>res.redirect('/'+req.params.numAluno))
    .catch(e => res.render('error', {error: e}))
})

    

    function verificaAutenticacao(req,res,next){
        if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
          next();
        } else{
          res.redirect("/login");}
      }
      

      module.exports = router;      
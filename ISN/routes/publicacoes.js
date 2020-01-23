var express = require('express');
var router = express.Router();
var axios = require('axios')



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
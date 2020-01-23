var express = require('express');
var router = express.Router();
var axios = require('axios')


// A SER CONSTRUIDO
router.post('/',verificaAutenticacao, function(req,res){
    var date =  new Date();
    axios.post('http://localhost:5003/publicacoes',{
        data: date,
        user_id  : req.session.passport.user,
        text: String,
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
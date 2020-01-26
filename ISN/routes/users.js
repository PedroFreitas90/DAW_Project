var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get('/',verificaAutenticacao, function(req, res, next) {
  axios.get('http://localhost:5003/utilizadores/info/'+req.user.numAluno)
  .then(dados1 =>{
        axios.get('http://localhost:5003/grupos/numAluno?numAluno='+req.user.numAluno )
        .then(dados2 => {
          axios.get('http://localhost:5003/publicacoes?numAluno='+req.user.numAluno)
          .then(dados3 => {
            res.render('perfil',{ utilizador:dados1.data, grupos : dados2.data , publicacoes:dados3.data})})
        })
  })
  .catch(e=>res.render('error',{error:e}))
});


router.get('/:idUser',verificaAutenticacao,function(req,res,next){
  axios.get('http://localhost:5003/utilizadores/info/'+idUser)
  .then(dados1 =>{
          axios.get('http://localhost:5003/publicacoes?numAluno='+idUser)
          .then(dados3 => {
            res.render('perfil',{ utilizador:dados1.data, publicacoes:dados3.data})})
        })
})


function verificaAutenticacao(req,res,next){
  if(req.isAuthenticated()){
  //req.isAuthenticated() will return true if user is logged in
    next();
  } else{
    res.redirect("/login");}
}

module.exports = router;

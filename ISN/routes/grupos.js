var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', verificaAutenticacao, function(req,res){
    axios.get('http://localhost:5003/grupos')
    .then(dados => res.render('grupos', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
})

router.post('/aderir',verificaAutenticacao,function(req,res){
    var idGrupo = req.query.grupo
    if(req.body.password){
        idGrupo=req.body.idGrupo
        axios.get('http://localhost:5003/grupos/password?idGrupo='+idGrupo+"&password="+req.body.password)
        .then(dados => {
            if (dados.data.length>0){
                axios.post('http://localhost:5003/grupos/utilizador',{
                    numAluno :  req.user.numAluno,
                    nome : req.user.nome,
                    foto : req.user.foto,
                    idGrupo : idGrupo,
                })
                .then(dados=>res.redirect('/grupos/'+idGrupo))
                .catch(e => res.render('error', {error: e}))
            }
            else {
                res.redirect('/feed')
                
            }

        })
        .catch(e => res.render('error', {error :e}))
        } 
   else{
    axios.post('http://localhost:5003/grupos/utilizador',{
        numAluno :  req.user.numAluno,
        nome : req.user.nome,
        foto : req.user.foto,
        idGrupo : idGrupo,
    })
    .then(dados=>res.redirect('/grupos/'+idGrupo))
    .catch(e => res.render('error', {error: e}))
}
})   


router.get('/:idGrupo',verificaAutenticacao, function(req,res){
    axios.get('http://localhost:5003/grupos/'+req.params.idGrupo+'?numAluno='+req.user.numAluno) 
    .then(dados1 => {
        axios.get('http://localhost:5003/grupos/'+req.params.idGrupo)
            .then(dados2 => {
                if(dados1.data.length ==0 )
                res.render('aderir', {grupo: dados2.data})
                else
                res.render('grupo', {grupo:dados2.data})
            })
            .catch(e => res.render('error', {error: e}))
            })
    .catch(e => res.render('error', {error: e}))
})



router.post('/',verificaAutenticacao, function(req,res){
    console.log(req.body)
    axios.post('http://localhost:5003/grupos',{
        numAluno : req.user.numAluno,
        nomeUtilizador: req.user.nome,
        fotoUtilizador : req.user.foto,
        nomeGrupo : req.body.nome,
        password: req.body.password,
        tipo: req.body.tipo   
    })
    .then(dados=>res.redirect('/feed'))
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
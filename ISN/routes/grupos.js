var express = require('express');
var router = express.Router();
var axios = require('axios')
var Ficheiro = require('../models/ficheiros')
var multer = require('multer')
var upload = multer({dest:'uploads/'})
var fs = require('fs');
var bcrypt = require('bcryptjs');
var nanoid = require('nanoid')
var fs = require('fs')
var path = require('path')
var jwt = require('jsonwebtoken')

function gerarToken(){
    var token = jwt.sign({}, "isn2020",
      {
        expiresIn: 3000,
        issuer: "FrontEnd ISN"
      })
      return token
}

router.get('/', verificaAutenticacao, function(req,res){
    token = gerarToken()
    axios.get('http://localhost:5003/grupos?token'+token)
    .then(dados1 => { 
    axios.get('http://localhost:5003/utilizadores/info/' + req.user.numAluno+'?token='+token)
    .then(dados2 =>  res.render('pages/ver-grupos', { grupos: dados1.data, utilizador: dados2.data}))
    })
    .catch(e => res.render('error', {error: e}))
})



router.get('/:idGrupo',verificaAutenticacao, function(req,res){
    token = gerarToken()
    axios.get('http://localhost:5003/grupos/'+req.params.idGrupo+'?numAluno='+req.user.numAluno+'&token='+token) 
    .then(dados1 => {
        axios.get('http://localhost:5003/grupos/'+req.params.idGrupo+'?token='+token)
        .then (dados2 => {
            axios.get('http://localhost:5003/publicacoes?grupo='+req.params.idGrupo+'&token='+token)
            .then(dados3 =>{
                axios.get('http://localhost:5003/utilizadores/info/' + req.user.numAluno+'?token='+token)
                .then (dados4 => {   
                if(dados1.data.length ==0 )
                res.render('aderir', {grupo: dados2.data , publicacoes : dados3.data , utilizador : dados4.data})
                else
                res.render('pages/grupo', {grupo:dados2.data , publicacoes : dados3, utilizador : dados4.data})
            })
            .catch(e => res.render('error', {error: e}))
            })
    .catch(e => res.render('error', {error: e}))
})
})
})

router.post('/aderir',verificaAutenticacao,function(req,res){
    var idGrupo = req.query.grupo
    token = gerarToken()
    if(req.body.password){
        idGrupo=req.body.idGrupo
        axios.get('http://localhost:5003/grupos/password?idGrupo='+idGrupo+"&password="+req.body.password+'&token='+token)
        .then(dados => {
            if (dados.data.length>0){
                axios.post('http://localhost:5003/grupos/utilizador?token'+token,{
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
    axios.post('http://localhost:5003/grupos/utilizador?token='+token,{
        numAluno :  req.user.numAluno,
        nome : req.user.nome,
        foto : req.user.foto,
        idGrupo : idGrupo,
    })
    .then(dados=>res.redirect('/grupos/'+idGrupo))
    .catch(e => res.render('error', {error: e}))
}
})   



router.post('/',upload.single('imagem'), verificaAutenticacao, function(req,res){
    var id = nanoid()
    var extension = path.extname(req.file.originalname)
    let oldPath = __dirname + '/../' + req.file.path
    let newPath = __dirname + '/../public/ficheiros/'+ id+extension
   
    fs.rename(oldPath, newPath, function(err){ //mexer ficheiro da cache para public/ficheiros
      if(err) throw err
    })

    var hash = bcrypt.hashSync(req.body.password, 10)

    let novoFicheiro = new Ficheiro({
      name: id+extension,
      mimetype: req.file.mimetype,
      size: req.file.size,
      originalName:req.file.originalname
    })
    token = gerarToken()
    axios.post('http://localhost:5003/grupos?token='+token,{
        numAluno : req.user.numAluno,
        nomeUtilizador: req.user.nome,
        nomeGrupo : req.body.nome,
        password: hash, 
        tipo: req.body.tipo,
        fotoGrupo : novoFicheiro   
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
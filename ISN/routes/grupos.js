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
        expiresIn: 30,
        issuer: "FrontEnd ISN"
      })
      return token
}

router.get('/', verificaAutenticacao, function(req,res){
    token = gerarToken()
    axios.get('http://localhost:5003/grupos?token='+token)
    .then(dados1 => { 
    axios.get('http://localhost:5003/utilizadores/info/' + req.user.numAluno+'?token='+token)
    .then(dados2 =>  res.render('pages/ver-grupos', { grupos: dados1.data, utilizador: dados2.data}))
    })
    .catch(e => res.render('error', {error: e}))
})



router.get('/:idGrupo',verificaAutenticacao, function(req,res){
    token = gerarToken()
        axios.get('http://localhost:5003/grupos/'+req.params.idGrupo+'?token='+token)
        .then (dados1 => {
            axios.get('http://localhost:5003/publicacoes?grupo='+req.params.idGrupo+'&token='+token)
            .then(dados2 =>{
                axios.get('http://localhost:5003/utilizadores/info/' + req.user.numAluno+'?token='+token)
                .then (dados3 => {   
                res.render('pages/grupo', {grupo:dados1.data , publicacoes : dados2.data, utilizador : dados3.data})
            })
            .catch(e => res.render('error', {error: e}))
            })
    .catch(e => res.render('error', {error: e}))
})
})

router.post('/aderir',verificaAutenticacao,function(req,res){
    token = gerarToken()
    if(req.body.password){
        axios.get('http://localhost:5003/grupos/password?idGrupo='+req.body.idGrupo+"&password="+req.body.password+'&token='+token)
        .then(dados => {
            if (dados.data.length>0){
                axios.post('http://localhost:5003/grupos/utilizador?token='+token,{
                    numAluno :  req.user.numAluno,
                    nome : req.user.nome,
                    idGrupo : req.body.idGrupo,
                })
                .then(dados=>res.redirect('/grupos/'+req.body.idGrupo))
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
        idGrupo : req.body.idGrupo,
    })
    .then(dados=>res.redirect('/grupos/'+req.body.idGrupo))
    .catch(e => res.render('error', {error: e}))
}
})   


router.delete('/sair',verificaAutenticacao,function(req,res){
   var token = gerarToken()
    if(req.query.numAluno){
        axios.delete('http://localhost:5003/grupos/sair?idGrupo='+req.query.idGrupo+'&numAluno='
                                                                +req.query.numAluno+'&token='+token)
        .then(dados => res.redirect("/grupos/"+idGrupo))
        .catch(e => res.render('error', {error: e}))   
    }   
    else {
        axios.delete('http://localhost:5003/grupos/sair?idGrupo='+req.query.idGrupo+'&numAluno='
                                                                +req.user.numAluno+'&token='+token)
        .then(dados => res.redirect("/grupos/"+idGrupo))
        .catch(e => res.render('error', {error: e}))
    }
       
})


router.post('/editar/:idGrupo',verificaAutenticacao,function(req,res){
    var body = {
                nome: req.body.nome,
                password: req.body.password          
            }
    if(req.file){
        var extension = path.extname(req.file.originalname)
      let oldPath = __dirname + '/../' + req.file.path
      let newPath = __dirname + '/../public/ficheiros/'+id+extension
     console.log(req.file)
      fs.rename(oldPath, newPath, function(err){ //mexer ficheiro da cache para public/ficheiros
        if(err) throw err
      })
    
      let novoFicheiro = new Ficheiro({
        name: id+extension,
        mimetype: req.file.mimetype,
        size: req.file.size,
        originalName:req.file.originalname
      })
      body.foto=novoFicheiro
    }

    token = gerarToken()
    axios.put('http://localhost:5003/grupos/'+req.params.idGrupo+'?token='+token,body)
    .then(dados => res.redirect('/grupos/'+idGrupo))
      .catch(e => res.render('error', {error: e}))
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
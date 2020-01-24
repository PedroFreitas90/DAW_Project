var express = require('express');
var router = express.Router();
var axios = require('axios')
var Ficheiro = require('../models/ficheiros')
var multer = require('multer')
var upload = multer({dest:'uploads/'})
const fs = require('fs')
var hashtags = require('../public/scripts/hashtags')
// A SER CONSTRUIDO
router.post('/',upload.array('ficheiro'),verificaAutenticacao,function(req,res){
    var ficheirosArray = []

    for(var i = 0; i < req.files.length; i++){
      let oldPath = __dirname + '/../' + req.files[i].path
      let newPath = __dirname + '/../public/ficheiros/' + req.files[i].originalname
      console.log("cheguei aqui ")      
      fs.rename(oldPath,newPath,function(err){
        if(err) throw err
      })
      let novoFicheiro = new Ficheiro({
        name: req.files[i].originalname,
        mimetype:req.files[i].mimetype,
        size: req.files[i].size  
      })
      ficheirosArray.push(novoFicheiro)
    }
    
    axios.post('http://localhost:5003/publicacoes', {
        user_id : req.user.numAluno,
        titulo : req.body.titulo,
        text : req.body.texto,
        ficheiros : ficheirosArray,
        group : req.body.grupo,
        marcadores : hashtags.filtraHashtags(req.body.texto)
      })

      .then(dados => res.redirect('/feed'))
      .catch(e=>res.render('error',{error:e}))


})
    

    function verificaAutenticacao(req,res,next){
        if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
          next();
        } else{
          res.redirect("/login");}
      }
      




      module.exports = router;      
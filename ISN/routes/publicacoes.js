var express = require('express');
var router = express.Router();
var axios = require('axios')


// A SER CONSTRUIDO
/*router.post('/',upload.array('ficheiro'),function(req,res){
    var ficheiros = new Array();
    for(var i = 0; i < req.files.length; i++){
      let oldPath = __dirname + '/../' + req.files[i].path
      let newPath = __dirname + '/../public/ficheiros/' + req.files[i].originalname
  
      fs.rename(oldPath,newPath,function(err){
        if(err) throw err
      })
  
      let data = new Date()
    
      let novoFicheiro = new Ficheiro({
        name: req.files[i].originalname,
        mimetype: req.files[i].mimetype,
        size: req.files[i].size  
      })
      ficheiros.push(novoFicheiro)
  
    }
    
*/
    function verificaAutenticacao(req,res,next){
        if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
          next();
        } else{
          res.redirect("/login");}
      }
      

      module.exports = router;      
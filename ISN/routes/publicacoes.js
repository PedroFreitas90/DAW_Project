var express = require('express');
var router = express.Router();
var axios = require('axios')
var Ficheiro = require('../models/ficheiros')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const fs = require('fs')
var hashtags = require('../public/scripts/hashtags')
var nanoid = require('nanoid')
var jwt = require('jsonwebtoken')
var path = require('path')

function geratoken(req,res,next){
  var token = jwt.sign({},"isn2020",
    {
      expiresIn: 3000,
      issuer: "FrontEnd ISN"
    })
  return token
}

/*
router.get('/hashtag/:hashtag',verificaAutenticacao,function(req,res){
  axios.get('http://localhost:5003/publicacoes?hashtag='+req.params.hashtags+'&token='+token)
})

*/
router.get('/:idPublicacao', verificaAutenticacao, function (req, res) {
  token = geratoken()
  axios.get('http://localhost:5003/publicacoes/' + req.params.idPublicacao+'?token='+token)
    .then(dados1 => {
      axios.get('http://localhost:5003/publicacoes/comentarios/' + req.params.idPublicacao+'?token='+token)
        .then(dados2 => {
          axios.get('http://localhost:5003/publicacoes/gostos/' + req.params.idPublicacao+'?token='+token)
            .then(dados3 => {
              axios.get('http://localhost:5003/utilizadores/info/' + req.user.numAluno+'?token='+token)
                .then(dados4 =>  res.render('pages/publicacao', { publicacao: dados1.data, comentarios: dados2.data, gostos: dados3.data, utilizador: dados4.data }))
            })
        })
    })
    .catch(e => res.render('error', { error: e }))
})


router.post('/comentario/gosto', verificaAutenticacao, function (req, res) {
  console.log(req.body)
  token = geratoken()
  axios.post('http://localhost:5003/publicacoes/comentario/gosto?token='+token, {
    idPublicacao: req.body.idPublicacao,
    idComentario: req.body.idComentario,
    user: req.user.numAluno
  })
    .then(dados => res.redirect("/publicacoes/" + req.body.idPublicacao))
    .catch(e => res.render('error', { error: e }))
})



router.post('/gosto', verificaAutenticacao, function (req, res) {
  console.log(req.body)
  token = geratoken()
  axios.post('http://localhost:5003/publicacoes/gosto?token='+token, {
    idPublicacao: req.body.idPublicacao,
    user: req.user.numAluno
  })
    .then(dados => res.redirect("/publicacoes/" + req.body.idPublicacao))
    .catch(e => res.render('error', { error: e }))
})

router.post('/', upload.array('ficheiro'), verificaAutenticacao, function (req, res) {
  var ficheirosArray = []

  for (var i = 0; i < req.files.length; i++) {
    var id = nanoid()
    var extension = path.extname(req.files[i].originalname)
    let oldPath = __dirname + '/../' + req.files[i].path
    let newPath = __dirname + '/../public/ficheiros/'+ id+extension
    console.log("cheguei aqui ")
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err
    })
    let novoFicheiro = new Ficheiro({
      name: id+extension,
      mimetype: req.files[i].mimetype,
      size: req.files[i].size,
      originalName:req.files[i].originalname
    })
    ficheirosArray.push(novoFicheiro)
  }
  token = geratoken()
  axios.post('http://localhost:5003/publicacoes?token='+token, {
    user_id: req.user.numAluno,
    titulo: req.body.titulo,
    text: req.body.texto,
    ficheiros: ficheirosArray,
    group: req.body.grupo,
    marcadores: hashtags.filtraHashtags(req.body.texto)
  })

    .then(dados => res.redirect('/feed'))
    .catch(e => res.render('error', { error: e }))


})


router.post('/comentario', upload.array('ficheiro'), verificaAutenticacao, function (req, res) {
  console.log(req.body)

  var ficheirosArray = []

  for (var i = 0; i < req.files.length; i++) {
    var id = nanoid()
    var extension = path.extname(req.files[i].originalname)
    let oldPath = __dirname + '/../' + req.files[i].path
    let newPath = __dirname + '/../public/ficheiros/'+ id+extension
    console.log("cheguei aqui ")
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err
    })
    let novoFicheiro = new Ficheiro({
      name: id+extension,
      mimetype: req.files[i].mimetype,
      size: req.files[i].size,
      originalName:req.files[i].originalname
    })
    ficheirosArray.push(novoFicheiro)
  }
  token = geratoken()
  axios.post('http://localhost:5003/publicacoes/comentario/' + req.body.idPublicacao+'?token='+token, {
    user_id: req.user.numAluno,
    text: req.body.texto,
    ficheiros: ficheirosArray
  })

    .then(dados => res.redirect(req.get('referer')))
    .catch(e => res.render('error', { error: e }))

})

/*router.post('/:idGrupo', upload.array('ficheiro'), verificaAutenticacao, function (req, res) {
  var ficheirosArray = []

  for (var i = 0; i < req.files.length; i++) {
    var id = nanoid()
    var extension = path.extname(req.files[i].originalname)
    let oldPath = __dirname + '/../' + req.files[i].path
    let newPath = __dirname + '/../public/ficheiros/'+ id + extension
    console.log("cheguei aqui ")
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err
    })
    let novoFicheiro = new Ficheiro({
      name: id+extension,
      mimetype: req.files[i].mimetype,
      size: req.files[i].size,
      originalName:req.files[i].originalname
    })
    ficheirosArray.push(novoFicheiro)
  }
  token = geratoken()
  axios.post('http://localhost:5003/publicacoes/' + idGrupo+'?token='+token, {
    user_id: req.user.numAluno,
    titulo: req.body.titulo,
    text: req.body.texto,
    ficheiros: ficheirosArray,
    group: req.body.grupo,
    group_id: req.params.idGrupo,
    marcadores: hashtags.filtraHashtags(req.body.texto)
  })

    .then(dados => res.redirect('/grupos/:idGrupo'))
    .catch(e => res.render('error', { error: e }))


})
*/
function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/login");
  }
}





module.exports = router;      
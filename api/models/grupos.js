const mongoose = require('mongoose')
var Publicacoes = require('./publicacoes')


var fotoSchema = new mongoose.Schema({
  _id :String,
  name: String,
  mimetype: String,
  size: Number,
  originalName:String
});


var UtilizadorSchema = new mongoose.Schema({
  numAluno: { type: String, required: true },
  nome: { type: String, required: true },
});
  



var grupoSchema = new mongoose.Schema({
  id : {type : String, required:true},
  admin: { type: UtilizadorSchema, required: true },
  nome: { type: String, required: true },
  password: String,
  tipo :String,
  fotoGrupo : {type : fotoSchema ,required :true},
  utilizadores: [UtilizadorSchema]



});
  
module.exports = mongoose.model('grupos', grupoSchema)
const mongoose = require('mongoose')
var Utilizador = require('./utilizadores')
var Publicacoes = require('./Publicacoes')


var grupoSchema = new mongoose.Schema({
  admin: { type: String, required: true },
  nome: { type: String, required: true },
  password: String,
  tipo :String,
  utilizadores: [Utilizador.schema],
  Publicacoes: [Publicacoes]



});
  
module.exports = mongoose.model('grupos', grupoSchema)
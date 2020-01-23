const mongoose = require('mongoose')
var Utilizador = require('./utilizadores')
var Publicacoes = require('./publicacoes')


var grupoSchema = new mongoose.Schema({
  admin: { type: Utilizador.schema, required: true },
  nome: { type: String, required: true },
  password: String,
  tipo :String,
  utilizadores: [Utilizador.schema],
  publicacoes: [Publicacoes.schema]



});
  
module.exports = mongoose.model('grupos', grupoSchema)
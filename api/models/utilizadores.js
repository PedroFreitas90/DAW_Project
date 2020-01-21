const mongoose = require('mongoose')

var fotoSchema = new mongoose.Schema({
  desc: String,
  name: String,
  mimetype: String,
  size: Number
});

var eventoSchema = new mongoose.Schema({
  id: String,
  nome: String,
  local: String,
  data: String
});


var utilizadorSchema = new mongoose.Schema({
  numAluno: { type: String, required: true },
  nome: { type: String, required: true },
  password: { type: String, required: true },
  ultimoAcesso: String,
  eventos: [eventoSchema],
  foto: fotoSchema
});
  
module.exports = mongoose.model('utilizadores', utilizadorSchema)
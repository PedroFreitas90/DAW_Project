const mongoose = require('mongoose')

var fotoSchema = new mongoose.Schema({
  desc: String,
  name: String,
  mimetype: String,
  size: Number
});



var utilizadorSchema = new mongoose.Schema({
  numAluno: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  password: { type: String, required: true },
  email : {type :String , required : true, unique: true},
  bio : { type : String, maxlength : 512},
  website : String,
  curso : String,
  ultimoAcesso: String,
  foto: fotoSchema
});
  
module.exports = mongoose.model('utilizadores', utilizadorSchema)
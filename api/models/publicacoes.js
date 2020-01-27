const mongoose = require('mongoose')

var Utilizador = require('./utilizadores')



var ficheiroSchema = new mongoose.Schema({
    data: String,
    name: String,
    mimetype: String,
    size: Number,
    originalName:String
})

var gostoSchema = new mongoose.Schema({
    numero : { type : Number, required : true},
    users: [String]
})

var comentarioSchema = new mongoose.Schema({
    id: String,
    data: { type: String, required: true },
    user_id: { type: String, required: true },
    text: {type: String, required: true},
    ficheiros: [ficheiroSchema],
    gostos :{type : gostoSchema ,required: true}
});

var publicacaoSchema = new mongoose.Schema({
    id: String,
    data: { type: String, required: true },
    user_id: { type: String, required: true },
    titulo: {type : String , required : true},
    text: String,
    ficheiros: [ficheiroSchema],
    group: { type: String, required: true }, // Se não houver grupo, terá de dizer feed
    group_id: String,
    marcadores: [String],
    comentarios: [comentarioSchema],
    gostos : {type : gostoSchema ,required: true}
  });

module.exports = mongoose.model('publicacoes', publicacaoSchema)

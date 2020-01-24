const mongoose = require('mongoose')


var ficheiroSchema = new mongoose.Schema({
    data: String,
    desc: String,
    name: String,
    mimetype: String,
    size: Number
})

var comentarioSchema = new mongoose.Schema({
    id: String,
    data: { type: String, required: true },
    user_id: { type: String, required: true },
    text: {type: String, required: true},
    ficheiros: [ficheiroSchema],
    marcadores: [String]
});

var publicacaoSchema = new mongoose.Schema({
    id: String,
    data: { type: String, required: true },
    user_id: { type: String, required: true },
    titulo: {type : String , required : true},
    text: String,
    ficheiros: [ficheiroSchema],
    group: { type: String, required: true }, // Se não houver grupo, terá de dizer feed
    marcadores: [String],
    comentarios: [comentarioSchema]
  });

module.exports = mongoose.model('publicacoes', publicacaoSchema)

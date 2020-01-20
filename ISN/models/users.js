var mongoose = require('mongoose')


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


var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    nome: String,
    numAluno: String,
    eventos: [eventoSchema],
    foto: fotoSchema
});

module.exports=mongoose.model('isn_dbs',userSchema,'users')
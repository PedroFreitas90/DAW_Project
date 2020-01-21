var Utilizador = require('../models/utilizadores')

module.exports.listar = () => {
    return Utilizador
        .find()
        .exec()
}

module.exports.consultar = numAluno => {
    return Utilizador
        .findOne({numAluno: numAluno})
        .exec()
}

module.exports.inserir = u => {
    var novo = new Utilizador(u)
    return novo.save()
}
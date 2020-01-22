var Pubs = require('../models/publicacoes')

module.exports.listar = () => {
    return Pubs
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Pubs
        .findOne({id: id})
        .exec()
}

module.exports.filtrarAutor = uid => {
    return Pubs
        .find({user_id: uid})
        .exec()
}
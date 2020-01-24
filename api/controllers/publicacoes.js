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

module.exports.filtrarGrupo = grupoNome =>{
    return Pubs
            .find({group : grupoNome}).sort({data:-1})
            .exec()
}


module.exports.inserir = g => {
    var novo = new Pubs(g)
    return novo.save()
}
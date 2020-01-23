var Grupo = require('../models/grupos')

module.exports.listar = () => {
    return Grupo
        .find()
        .exec()
}

module.exports.consultar = numGrupo => {
    return Grupo
        .findOne({_id: numGrupo})
        .exec()
}

module.exports.filtrarParticipante = idParticipante => {
    return Grupo
            .find({"utilizadores":{numAluno: idParticipante}})
            .exec()
}


module.exports.inserir = g => {
    var novo = new Grupo(g)
    return novo.save()
}
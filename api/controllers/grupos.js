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



module.exports.filtrarParticipante = (numALUNO,idGrupo) => {
    return Grupo
            .aggregate([
                {$unwind : "$utilizadores"},
                {$match: 
                {$and: 
                    [{id : idGrupo},{"utilizadores.numAluno" : numALUNO}]
                }
            }
            ])
            .exec()
            
           
}


module.exports.adicionarUtilizador = (idGrupo,utilizador) => {

    return Grupo.updateOne({id : idGrupo },{$push : {utilizadores : utilizador}})
}

module.exports.adicionarPublicacao = (idPublicacao,publicacao) => {
    return Grupo.update({id : idPublicacao },{$push : {publicacoes : publicacao}}).exec()
}


module.exports.verificaPassword = (idGrupo,pass) => {
    return Grupo.find({id : idGrupo ,password : pass  }).exec()
}

module.exports.consultarGruposAluno = aluno =>{
            return Grupo.find({
                utilizadores : {
                    $elemMatch : { numAluno :aluno }
                }
            })
}

module.exports.inserir = g => {
    var novo = new Grupo(g)
    return novo.save()
}
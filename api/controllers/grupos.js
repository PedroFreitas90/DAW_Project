var Grupo = require('../models/grupos')

module.exports.listar = () => {
    return Grupo
        .find()
        .exec()
}

module.exports.consultar = numGrupo => {
    return Grupo.aggregate([
        {$match : { id : numGrupo}},
        {$unwind : "$utilizadores"},
        {$lookup : { from : "utilizadores", localField :"utilizadores.numAluno",foreignField : "numAluno",as:"utilizadorFoto"}},
        {$project : { utilizadores : 0}}
    ])
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



module.exports.verificaPassword = (idGrupo,pass) => {
    return Grupo.find({id : idGrupo ,password : pass  }).exec()
}

 module.exports.consultarGruposPublicosAluno = aluno => {
     return Grupo.find({ tipo : "publico",
     utilizadores : {
        $elemMatch : { numAluno :aluno }
    } })
 }


module.exports.consultarGruposAluno = aluno =>{
            return Grupo.find({
                utilizadores : {
                    $elemMatch : { numAluno :aluno }
                }
            })
}


module.exports.top10 = () => {
    return Grupo.aggregate([
        {$match : { tipo : "publico"}},
        {$project : { id :1 , admin : 1 , nome : 1 , tipo:1, fotoGrupo : 1 ,utilizadores :1 , 
            numeroUtilizadores : {$cond : { if : {$isArray : "$utilizadores" },then : { $size : "$utilizadores"},else : "NA"}}}},
            {$sort : { numeroUtilizadores : -1}},
            {$limit : 10}]).exec()

}

module.exports.inserir = g => {
    var novo = new Grupo(g)
    return novo.save()
}

module.exports.eliminarUtilizadorGrupo = (idGrupo,numAluno) => {
    return Grupo.update({id : idGrupo},
        {$pull : { utilizadores : { numAluno : numAluno}}})
        .exec()
}


module.exports.updateComPassword = (idGrupo,body) =>{
    if(!body.foto){
    return Utilizador.update({id : idGrupo},
        {$set :{
            nome : body.nome,
            password : body.password,
            
        } })
}
else{
return Utilizador.update({id : idGrupo},
    {$set :{
        nome : body.nome,
        password : body.password,
        foto : body.foto,            
    } })
}
}



module.exports.updateSemPassword = (idGrupo,body) =>{
    if(!body.foto){
    return Utilizador.update({id : idGrupo},
        {$set :{
            nome : body.nome,
        } })
}
else{
return Utilizador.update({numAluno : numAluno},
    {$set :{
        nome : body.nome,
        foto : body.foto,          
    } })
}


}

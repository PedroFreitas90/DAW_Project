var Pubs = require('../models/publicacoes')

module.exports.listar = () => {
    return Pubs
        .find()
        .exec()
}

module.exports.consultar = idU => {
    return Pubs
    .aggregate([{$match : { id : idU}},
        {$lookup : { from : "utilizadores", localField :"user_id",foreignField : "numAluno",as:"user"} 
        }]).exec()
        
}



module.exports.adicionarComentarioGosto = (idPub,idCom,idUser) => {
    return Pubs.update({ id: idPub ,"comentarios.id" : idCom }, {$push : {"comentarios.$.gostos.users" : idUser },$inc : {"comentarios.$.gostos.numero" : 1}}).exec()


}

module.exports.publicacaoGostos = idPub => {
    return Pubs
    .aggregate([{$match : { id : idPub}},
        {$unwind : "$gostos.users"},
        {$lookup : { from : "utilizadores", localField :"gostos.users",foreignField : "numAluno",as:"userGosto"} 
        }]).exec()
}


module.exports.publicacaoComentarios = idPub => {
    return Pubs
    .aggregate([{$match : { id : idPub}},
        {$unwind : "$comentarios"},
        {$lookup : { from : "utilizadores", localField :"comentarios.user_id",foreignField : "numAluno",as:"userComentario"} 
        }]).exec()
}

module.exports.filtrarAutor = uid => {
    return Pubs
    .aggregate([{$match : { user_id : uid , group_id : "feed" }},
        {$lookup : { from : "utilizadores", localField :"user_id",foreignField : "numAluno",as:"user"} 
        },{$sort : { data : -1}}]).exec()
}

module.exports.verificaGostoComentario =  (idPub, idComentario,idUser) => {
    return Pubs
    .aggregate([{$unwind : "$comentarios"},
            {$unwind : "$comentarios.gostos"},
            {$match : { id : idPub , "comentarios.id" : idComentario}},
            {$unwind : "$comentarios.gostos.users"},
            {$match : { "comentarios.gostos.users" :idUser}}]).exec()

}

module.exports.verificaGosto = (idPub,user_id) => {
    return Pubs
    .aggregate([
        {$unwind : "$gostos.users"},
        {$match: 
        {$and: 
            [{id : idPub},{"gostos.users" : user_id}]
        }
    }
    ])
    .exec()
    
   
}


module.exports.filtrarGrupo = grupoID =>{
     return Pubs
        .aggregate([{$match : { group_id : grupoID}},
            {$lookup : { from : "utilizadores", localField :"user_id",foreignField : "numAluno",as:"user"} 
            },{$sort : { data : -1}}]).exec()
}


module.exports.removeGostoComentario =(idPub,idCom,idUser) =>{
    return Pubs.update({id: idPub ,"comentarios.id" : idCom },
    {$pull : {"comentarios.$.gostos.users" : idUser },$inc : {"comentarios.$.gostos.numero" : -1}})
}

module.exports.removeGosto = (idPub,user_id) => {
    return Pubs.update(
        { id: idPub },
        { $pull: { 'gostos.users': user_id } ,$inc : {"gostos.numero" : -1}}) 
}

module.exports.adicionarGosto = (idPub, user) => {
    return Pubs.updateOne({ id: idPub}, {$push : {"gostos.users" : user },$inc : {"gostos.numero" : 1}}).exec()
}

module.exports.adicionarComentario = (idPublicacao,comentario) => {
    return Pubs.update({id : idPublicacao },{$push : {comentarios : comentario}}).exec()
}



module.exports.inserir = g => {
    var novo = new Pubs(g)
    return novo.save()
}


module.exports.publicacoesPorGrupo = gid =>{
    return Pubs.find({group_id: gid}).exec()
}

module.exports.removerPublicacao= function(pid) {
    return Pubs.deleteOne({id:pid})
}


module.exports.filtrarHashtags = hashtag => {
    return Pubs.find({ group_id : "feed" , marcadores : hashtag })
}
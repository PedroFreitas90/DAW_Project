var Utilizador = require('../models/utilizadores')

module.exports.listar = () => {
    return Utilizador
        .find()
        .exec()
}

module.exports.verificarUtilizador = (uid,umail) =>{
    return Utilizador.find({$or: [{numAluno: uid},{email: umail}]}).exec()
}

module.exports.consultarPassword = ( numAluno, password) => {
    return Utilizador.find({numAluno : numAluno , password : password}).exec()
}

module.exports.consultar = numAluno => {
    return Utilizador
        .findOne({numAluno: numAluno})
        .exec()
}


module.exports.updateUtilizadores = (numAluno,body) =>{
    if(!body.foto){
    return Utilizador.update({numAluno : numAluno},
        {$set :{
            nome : body.nome,
            password : body.password,
            email : body.email,
            bio : body.bio,
            website : body.website,
            curso : body.curso
            
        } })
}
else{
return Utilizador.update({numAluno : numAluno},
    {$set :{
        nome : body.nome,
        password : body.password,
        email : body.email,
        bio : body.bio,
        website : body.website,
        foto : body.foto,
        curso : body.curso            
    } })
}


}

module.exports.inserir = u => {
    var novo = new Utilizador(u)
    return novo.save()
   
}
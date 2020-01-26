
module.exports.filtraHashtags = texto =>{
    var regex = /#[a-z0-9][a-z0-9\-_]*/ig
    return marcadores = texto.match(regex)
}

function darGostoPublicacao(idPub){
    axios.post('http://localhost:5004/publicacoes/gosto',{
        idPublicacao : idPub
    })
    .then(dados => res.redirect(""+idPub))
    .catch(e=>res.render('error',{error:e}))
}


function darGostoComentario(idPub,idComentario){
    axios.post('http://localhost:5004/publicacoes/comentario/gosto',{
        idPublicacao : idPub,
        idComentario : idComentario
    })
    .then(dados => res.redirect(""+idPub))
    .catch(e=>res.render('error',{error:e}))
}




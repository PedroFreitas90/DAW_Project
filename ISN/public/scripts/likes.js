function darGostoPublicacao(idPub) {
    axios.post('http://localhost:5004/publicacoes/gosto', {
        idPublicacao: idPub
    })
        .then(dados => {
            var elem_class = $('#like' + idPub).attr('class');

            switch (elem_class) {
                case "far fa-heart coracao":
                    $('#like' + idPub).addClass('fas').removeClass('far');
                    return;
                case "fas fa-heart coracao":
                    $('#like' + idPub).addClass('far').removeClass('fas');
                    return;
            }
        }/* res.redirect("" + idPub) */)
        .catch(e => res.render('error', { error: e }))
}


function darGostoComentario(idPub, idComentario) {
    axios.post('http://localhost:5004/publicacoes/comentario/gosto', {
        idPublicacao: idPub,
        idComentario: idComentario
    })
        .then(dados => {
            var elem_class = $('#like' + idComentario).attr('class');

            switch (elem_class) {
                case "far fa-heart coracao":
                    $('#like' + idComentario).addClass('fas').removeClass('far');
                    return;
                case "fas fa-heart coracao":
                    $('#like' + idComentario).addClass('far').removeClass('fas');
                    return;
            }
        }/* res.redirect(""+idPub) */)
        .catch(e => res.render('error', { error: e }))
}
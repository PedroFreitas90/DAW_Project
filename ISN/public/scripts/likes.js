function darGostoPublicacao(idPub) {
    axios.post('http://localhost:5004/publicacoes/gosto', {
        idPublicacao: idPub
    })
        .then(dados => {
            var element = document.getElementById('like' + idPub).classList;

            if (element.contains('fas')) {
                document.getElementById('like' + idPub).classList.remove('fas');
                document.getElementById('like' + idPub).classList.add('far');

                var count = document.getElementById('like' + idPub).nextSibling.data.trim();
                count = parseInt(count);
                count = count - 1;
                document.getElementById('like' + idPub).nextSibling.data = ' ' + count;
                return;
            }

            if (element.contains('far')) {
                document.getElementById('like' + idPub).classList.remove('far');
                document.getElementById('like' + idPub).classList.add('fas');

                var count = document.getElementById('like' + idPub).nextSibling.data.trim();
                count = parseInt(count);
                count = count + 1;
                document.getElementById('like' + idPub).nextSibling.data = ' ' + count;
                return;
            }
        })
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
        })
        .catch(e => res.render('error', { error: e }))
}
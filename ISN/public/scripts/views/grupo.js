function aderirGrupo(idGrupo) {
    var body = { idGrupo: idGrupo };
    axios.post('/grupos/aderir', body)
        .then(dados => {
            location.reload();
        })
        .catch(e => alert('Ocorreu um erro: ' + e.error))
}

function sairGrupo(idGrupo) {
    axios.delete('/grupos/sair?idGrupo=' + idGrupo)
        .then(dados => {
            location.reload();
        })
        .catch(e => alert('Ocorreu um erro: ' + e.error))
}

function removerMembroGrupo(idGrupo, idAluno) {
    var body = { numAluno: idAluno, idGrupo: idGrupo };

    axios.delete('/grupos/sair?idGrupo=' + idGrupo + '&numAluno=' + idAluno)
        .then(dados => {
            location.reload();
        })
        .catch(e => alert('Ocorreu um erro: ' + e.error))
}
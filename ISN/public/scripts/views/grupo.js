function aderirGrupo(idGrupo) {
    var body = { idGrupo: idGrupo };
    axios.post('/grupos/aderir', body)
        .then(dados => {
            location.reload();
        })
        .catch(e => alert('Ocorreu um erro: ' + e.error))
}

function sairGrupo(idGrupo) {
    var body = { idGrupo: idGrupo };
    axios.delete('/grupos/sair', body)
        .then(dados => {
            location.reload();            
        })
        .catch(e => alert('Ocorreu um erro: ' + e.error))
}

function removerMembroGrupo(idGrupo, idAluno) {
    var body = { numAluno: idAluno, idGrupo: idGrupo };

    axios.delete('/grupos/sair', body)
        .then(dados => {

        })
        .catch(e => alert('Ocorreu um erro: ' + e.error))
}
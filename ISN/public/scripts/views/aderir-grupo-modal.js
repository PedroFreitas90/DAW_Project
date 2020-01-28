function validateAderirGrupoForm() {
    let password = $('#aderirGrupoPassword').val();
    let idGrupo = $('#aderirGrupoId').val();
    var body = {
        password: password,
        idGrupo: idGrupo
    }
    axios.post('/grupos/aderir/', body)
        .then(dados => {
            location.reload();
        })
        .catch(e => alert('Ocorreu um erro: ' + e.error))
}

bootstrapValidate('#aderirGrupoPassword', 'required:Introduza a password.');
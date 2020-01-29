function validateFormEditarGrupoModal() {
    let nome = $('#editGrupoNome').val();
    let tipo = $('#editGrupoTipo').val();
    let password = $('#editGrupoPassword').val();
    let idGrupo = $('#idGrupo').val();
    if (nome.length > 0 && tipo.length > 0) {

        var formData = new FormData();
        formData.append('nome', nome);
        formData.append('password', password);
        formData.append('tipo', tipo);
        var image = document.querySelector('#editarUtilizadorImagem').files[0];
        formData.append('imagem', image);

        axios.post('/grupos/editar/' + idGrupo,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(dados => {
                location.reload();
            })
            .catch(e => alert('Ocorreu um erro: ' + e.error))
    }
}

$('#editGrupoTipo').ready(() => {
    let tipo = $('#editGrupoTipo').val();
    if (tipo == 'privado')
        $('#editGrupoPasswordDiv').removeClass('d-none');
})

$("#editGrupoTipo").change(() => {
    let tipo = $('#editGrupoTipo').val();

    switch (tipo) {
        case 'privado':
            $('#editGrupoPasswordDiv').removeClass('d-none');
            break;
        case 'publico':
            $('#editGrupoPasswordDiv').addClass('d-none');
            break;
    }
});

bootstrapValidate('#editGrupoNome', 'required:Introduza um nome para o grupo.|max:12:Nome do grupo só pode ir até 12 caractéres.');
bootstrapValidate('#editGrupoPassword', 'min:8:Introduza uma password com mais de 8 caractéres.');
bootstrapValidate('#editGrupoImagem', 'required:Escolha uma imagem de grupo.');
function validateFormEditarGrupoModal() {
    let nome = $('#editGrupoNome').val();
    let tipo = $('#editGrupoTipo').val();

    return (nome.length > 0 && tipo.length > 0);
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
function validateFormGrupoModal() {
    let nome = $('#createGrupoNome').val();
    let tipo = $('#createGrupoTipo').val();
    let password = $('#createGrupoPassword').val();
    let imagem = $('#createGrupoImagem').val();

    switch (tipo) {
        case 'privado':
            return (nome.length > 0 && tipo.length > 0 && password.length > 8 && imagem.length > 0) ? true : false;
        case 'publico':
            return (nome.length > 0 && tipo.length > 0 && imagem.length > 0) ? true : false;
    }
}

$("#createGrupoTipo").change(() => {
    let tipo = $('#createGrupoTipo').val();

    switch (tipo) {
        case 'privado':
            $('#createGrupoPasswordDiv').removeClass('d-none');
            //$('#createGrupoPassword').addAttribute('required')
            break;
        case 'publico':
            $('#createGrupoPasswordDiv').addClass('d-none');
            break;
    }
});

bootstrapValidate('#createGrupoNome', 'required:Introduza um nome para o grupo.');
bootstrapValidate('#createGrupoPassword', 'min:8:Introduza uma password com mais de 8 caractéres.');
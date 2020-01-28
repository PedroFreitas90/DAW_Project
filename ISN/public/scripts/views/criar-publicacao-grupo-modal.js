function validateFormPublicacaoGrupoModal() {
    let titulo = $('#createPublicacaoGrupoTitulo').val();
    let texto = $('#createPublicacaoGrupoTexto').val();
    return (titulo.length > 0 && texto.length > 0)
        ? true : false;
}

bootstrapValidate('#createPublicacaoGrupoTitulo', 'required:Introduza um título.|max:32:Título da publicação só pode ter até 32 caractéres.');
bootstrapValidate('#createPublicacaoGrupoTexto', 'required:Introduza o texto.|max:256:Atingiu o máximo de caractéres.');
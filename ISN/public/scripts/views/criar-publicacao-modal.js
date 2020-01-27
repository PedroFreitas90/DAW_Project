function validateFormPublicacaoModal() {
    let titulo = $('#createPublicacaoTitulo').val();
    let texto = $('#createPublicacaoTexto').val();
    return (titulo.length > 0 && texto.length > 0)
        ? true : false;
}

bootstrapValidate('#createPublicacaoTitulo', 'required:Introduza um título.|max:32:Título da publicação só pode ter até 32 caractéres.');
bootstrapValidate('#createPublicacaoTexto', 'required:Introduza o texto.|max:256:Atingiu o máximo de caractéres.');
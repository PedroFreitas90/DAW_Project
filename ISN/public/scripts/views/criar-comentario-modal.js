function validateFormPublicacaoModal() {
    let texto = $('#createComentarioTexto').val();
    return (texto.length > 0);
}

bootstrapValidate('#createPublicacaoTexto', 'required:Introduza o comentário.|max:256:Atingiu o máximo de caractéres.');
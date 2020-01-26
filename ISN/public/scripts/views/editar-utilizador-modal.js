function validateEditUtilizadorModal() {
    let titulo = $('#createPublicacaoTitulo').val();
    let texto = $('#createPublicacaoTexto').val();
    return (titulo.length > 0 && texto.length > 0)
        ? true : false;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#editarUtilizadorImagem").change(function () {
    readURL(this);
});

bootstrapValidate('#editarUtilizadorNome', 'required:Introduza o seu nome.');
bootstrapValidate('#editarUtilizadorPasswordAntiga', 'min:8:Introduza uma password com mais de 8 caractéres.');
bootstrapValidate('#editarUtilizadorPasswordNova', 'min:8:Introduza uma password com mais de 8 caractéres.');
bootstrapValidate('#editarUtilizadorBio', 'max:512:Atingiu o máximo de caractéres.');
bootstrapValidate('#editarUtilizadorEmail', 'required:Introduza um email.|email:Introduza um email válido.');
bootstrapValidate('#editarUtilizadorWebsite', 'max:256:Atingiu o máximo de caractéres.');
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imagem").change(function () {
    readURL(this);
});
function validateFormRegisto() {
    let num = $('#registerNumAluno').val();
    let email = $('#registerEmail').val();
    let nome = $('#registerNome').val();
    let password = $('#registerPassword').val();
    let imagem = $('#registerImagem').val();
    return (num.length > 0 && email.length > 0 && nome.length > 0 && password.length >= 8 && imagem.length > 0)
        ? true : false;
}
bootstrapValidate('#registerNumAluno', 'required:Introduza o número de aluno.');
bootstrapValidate('#registerEmail', 'required:Introduza um email.|email:Introduza um email válido.');
bootstrapValidate('#registerNome', 'required:Introduza um nome.');
bootstrapValidate('#registerPassword', 'min:8:Introduza uma password com mais de 8 caractéres.')
bootstrapValidate('#registerImagem', 'required:Escolha uma imagem de perfil.');
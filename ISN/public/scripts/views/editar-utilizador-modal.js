function validateEditUtilizadorModal() {
    let nome = $('#editarUtilizadorNome').val();
    let passwordAntiga = $('#editarUtilizadorPasswordAntiga').val();
    let passwordNova = $('#editarUtilizadorPasswordNova').val();
    let bio = $('#editarUtilizadorBio').val();
    let email = $('#editarUtilizadorEmail').val();
    let website = $('#editarUtilizadorWebsite').val();
    let imagemPerfil = $('#editarUtilizadorImagem').val();

    if (passwordAntiga.length > 0 && passwordNova.length > 0) {
        let body = { passwordAntiga: passwordAntiga }

        axios.get('/checkPassword', body).then(data => {
            if (data.password) {
                alert('A password antiga está incorreta.')
                return false;
            }
            else
                return (nome.length > 0 && email.length > 0);
        }).catch(error => {
            alert('Ocorreu um erro a validar o perfil: ' + error)
        })
    } else {
        return (nome.length > 0 && email.length > 0);
    }

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
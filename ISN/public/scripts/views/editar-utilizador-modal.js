function validateEditUtilizadorModal() {
    let nome = $('#editarUtilizadorNome').val();
    let passwordAntiga = $('#editarUtilizadorPasswordAntiga').val();
    let passwordNova = $('#editarUtilizadorPasswordNova').val();
    let curso = $('#editarUtilizadorCurso').val();
    let bio = $('#editarUtilizadorBio').val();
    let email = $('#editarUtilizadorEmail').val();
    let website = $('#editarUtilizadorWebsite').val();
    let imagemPerfil = $('#editarUtilizadorImagem').val();

    if (passwordAntiga.length > 0 && passwordNova.length == 0 || passwordAntiga.length == 0 && passwordNova.length > 0) {
        alert('Tem de preencher os dois campos da password para puder mudar a sua password.');
        return false;
    }

    if (passwordAntiga.length > 0 && passwordNova.length > 0) {
        var body = { passwordAntiga: passwordAntiga }

        axios.post('/perfil/checkPassword', body)
            .then(data => {
                if (!data.data.password) {
                    alert('A password antiga está incorreta.')
                    return false;
                }
                else {
                    if (nome.length > 0 && email.length > 0) {
                        var formData = new FormData();
                        formData.append('nome', nome);
                        formData.append('password', passwordNova);
                        formData.append('curso', curso);
                        formData.append('bio', bio);
                        formData.append('email', email);
                        formData.append('website', website);
                        var image = document.querySelector('#editarUtilizadorImagem').files[0];
                        formData.append('imagem', image);
                        
                        axios.post('/perfil/editar',
                            formData,
                            { headers: { 'Content-Type': 'multipart/form-data' } })
                            .then(dados => {
                                location.reload();
                            })
                            .catch(e => alert('Ocorreu um erro: ' + e.error))
                    }
                }
            }).catch(error => {
                alert('Ocorreu um erro a validar o perfil: ' + error)
            })
        return false;
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
bootstrapValidate('#editarUtilizadorCurso', 'min:3:Introduza o seu curso.|max:44:Atingiu o máximo de caractéres.')
bootstrapValidate('#editarUtilizadorBio', 'max:134:Atingiu o máximo de caractéres.');
bootstrapValidate('#editarUtilizadorEmail', 'required:Introduza um email.|email:Introduza um email válido.');
bootstrapValidate('#editarUtilizadorWebsite', 'max:44:Atingiu o máximo de caractéres.');
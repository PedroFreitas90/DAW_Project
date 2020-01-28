function validateAderirGrupoForm() {
    let password = $('#aderirGrupoPassword').val();
    return (password.length > 0);
}

bootstrapValidate('#aderirGrupoPassword', 'required:Introduza a password.');
var cont = 1;

function showFormularioGrupo(){

    var formAction = $('<form action="/grupos" method="POST" >')
    var container = $('<div id="grupo">')
    var endContainer = $('</div>')

    var nameLabel = $('<label class="w3-cell">Nome do grupo:</label>')
    var nameInput = $('<input/>',{class: 'w3-input w3-cell', type: "text", name: "nome"})

    
    var tipoLabel1 = $('<input type="radio" name="tipo" value="publico" onclick="deletePassword()"> Público<br>')
    var tipoLabel2 = $('<input type ="radio" name ="tipo" value="privado" onclick="password()"> Privado<br>')
    
    var submit= $('<input class="w3-input" type="submit" value="Enviar">')

    container.append(nameLabel,nameInput,tipoLabel1,tipoLabel2)
    formAction.append(container,submit)


    $("#display").empty()
    $("#display").append(formAction)
    $("#display").modal()

}

function deletePassword(){
    if(cont>1){
        $("#formulario_password").remove()
        cont--
    }
}

function password(){
    if(cont == 1){
        var div= $('<div id="formulario_password">')
        var passwordLabel = $('<label class="w3-cell">Password:</label>')
        var passwordInput = $('<input class=w3-input w3-cell  type="text", name="password" required/>')
        div.append(passwordLabel,passwordInput)
        $("#grupo").after(div)
        cont++
    }
    else
        $("#grupo").show()

}
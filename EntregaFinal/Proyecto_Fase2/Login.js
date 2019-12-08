'use strict'
let loginBtn = document.getElementById('LoginBtn')
loginBtn.addEventListener("click", function(event){
    event.preventDefault()

    let correo = document.getElementById("username").value
    let password = document.getElementById("password").value

    let urlLogin = "http://localhost:3000/api/usuarios"

    fetch(urlLogin, {
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }).then(response => response.json())
    .then(function(usuarios){
       
        console.log(usuarios);
        for(let i = 0; i < usuarios.length; i++){
            // console.log(usuarios[i].correo + " " +  usuarios[i].password + " " +  usuarios[i].tipoUsuario);
            // console.log("correo input: " + correo);
            // console.log(usuarios[i].correo == correo);
            // console.log(usuarios[i].password == password);
            // console.log(usuarios[i].tipoUsuario == "ADMIN");
            if(usuarios[i].correo == correo && usuarios[i].password == password && usuarios[i].tipoUsuario == "ADMIN" ){
                console.log("ADMINNNNNNNN");
                console.log(alert("Tipo de cuenta: Administrador"));
                window.location.href = "listausuarios.html" 
            }
            else if(usuarios[i].correo == correo && usuarios[i].password == password && usuarios[i].tipoUsuario == "USUARIO"){
                console.log(alert('Tipo de cuenta: Usuario'));
            }
            else{
                console.log(alert('Usuario no registrado'));
                console.log("Usuario no registrado");
            }
        }
    })
})
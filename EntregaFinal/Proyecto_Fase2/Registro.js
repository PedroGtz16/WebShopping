


document.getElementById('RegistroSubmit').disabled = true

let formulario = document.querySelector('form')
formulario.addEventListener("change",()=>{
let inputs = document.querySelectorAll("#login input:invalid") // coleccion de inputs
    if(inputs.length >= 1){ // si existe al menos un elemento invalido
        document.getElementById('RegistroSubmit').disabled = true
    }
    else{
        document.getElementById('RegistroSubmit').disabled = false // activar el boton submit si todo esta correcto
    }
})



let submit = document.getElementById("RegistroSubmit")
let datosRegistro
submit.addEventListener("click",function(event){// handler para cuando hagas click al submit registro
    event.preventDefault()

let nombre = document.getElementById('name').value
let apellido = document.getElementById('lastName').value
let correo = document.getElementById('email').value
let contrasena = document.getElementById('password').value
let fechaNacimiento = document.getElementById('birthday').value
let telefono = document.getElementById('phone').value

datosRegistro = {
 nombre: nombre,
 apellido: apellido,
 correo: correo,
 password: contrasena,
 puntos: 0,
 membresia: "",
 fechaNacimiento: fechaNacimiento,
 metodoPago : "",
 telefono: telefono,
 tipoUsuario: "USUARIO"
}

let datosJSON = JSON.stringify(datosRegistro)
let urlUser = "http://localhost:3000/api/usuarios"



let arregloUsuarios // para ver si el usuario ya existe
fetch(urlUser,{
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }
}).then(res=> res.json())
.then(function(myJson){
    arregloUsuarios = myJson



let bandera = 0
for(let i = 0; i < arregloUsuarios.length; i++){
    if(arregloUsuarios[i].correo == datosRegistro.correo){
        bandera++
    }
}

// console.log(bandera);
if(bandera == 0){
    fetch(urlUser, {
        method: 'POST',
        body:[datosJSON],
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.log('Error: ',error))
    .then(response => {
        console.log('Usuario registrado: ',response)})
        console.log(alert('Usuario registrado'));
        window.location.href = "PaginaPrincipal.html" 
}else {
    console.log(alert('Usuario ya registrado'));
}
})
})


'use strict'


let urlUsuarios = "http://localhost:3000/usuarios"
fetch(urlUsuarios,{ // obtener todos los usuarios en formato JSON
    method: 'GET',
    headers:{
        'Content-Type':'application/json'
    }
}).then(response=>response.json())
.then(function(myJson){
    
    let htmlUsuarios = new Array(myJson.length) // array de htmls que almacena cada usuario
    for(let i = 0; i < myJson.length; i++){
        htmlUsuarios[i] = `
        <tr>
                <td>${myJson[i].id}</td>
                <td>${myJson[i].nombre}</td>
                <td>${myJson[i].apellido}</td>
                <td>${myJson[i].password}</td>
                <td>${myJson[i].correo}</td>
                <td>${myJson[i].telefono}</td>
                <td>${myJson[i].membresia}</td>
                <td>${myJson[i].fechaNacimiento}</td>
                <td>${myJson[i].tipoUsuario}</td>
                <td>${myJson[i].metodoPago}</td>
                <td>${myJson[i].puntos}</td>
                <td class="text-center">
                        <a href="#" class="btn btn-primary mt-2" id="btnEdit" data-toggle="modal" data-target="#Edicion" onclick=  "editar(event) "><i class="fas fa-pencil-alt edit "></i></a>
                        <a  class="btn btn-primary mt-2" data-toggle="modal" data-target="#Borrar" id="btnRemove" onclick = "eliminar(event)"><i class="fas fa-trash-alt  remove "></i></i></a>
                    </td>
            </tr>
        `
    }
    
    let divUsuarios = document.getElementById('lista') // guarda el div donde se insertara cada html
    for(let i = 0; i < myJson.length; i++){
        divUsuarios.insertAdjacentHTML('afterend',htmlUsuarios[i])
    }


})




//*************************** */
//****Eliminar Usuario */

function eliminar(event){
    event.preventDefault()
    let idActual = event.currentTarget.parentElement.previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.
    previousElementSibling.previousElementSibling.
    previousElementSibling.previousElementSibling.innerText
    
     console.log(idActual);

    let btnConfirmarDelete = document.getElementById('btnEliminar') // posicionarse en el boton rojo del modal de eliminar
    
    btnConfirmarDelete.addEventListener("click",function(event){
        event.preventDefault()
        let urlDelete = "http://localhost:3000/usuarios/"+idActual

        fetch(urlDelete,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>res.json())
        .catch(error=>console.log("Error: ",error))
        .then(response => console.log("Usuario borrado:",response))
    })
}





//**************************************** */
//******Editar/Actualizar usuario */
function editar(event){
    event.preventDefault()
    let idActual = event.currentTarget.parentElement.previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.
    previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.innerText


    let nombreActual = event.currentTarget.parentElement.previousElementSibling.
    previousElementSibling.previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.
    previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.innerText

    let apellidoActual = event.currentTarget.parentElement.previousElementSibling.
    previousElementSibling.previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.innerText

    let contraseñaActual = event.currentTarget.parentElement.previousElementSibling.
    previousElementSibling.previousElementSibling.
    previousElementSibling.previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.innerText

    let correoActual =  event.currentTarget.parentElement.previousElementSibling.
    previousElementSibling.
    previousElementSibling.previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.innerText

    let nivelActual = event.currentTarget.parentElement.previousElementSibling.
    previousElementSibling.previousElementSibling
    .previousElementSibling.previousElementSibling.innerText

    let cuentaActual = event.currentTarget.parentElement.previousElementSibling.
    previousElementSibling.previousElementSibling.innerText

    let puntosActual = event.currentTarget.parentElement.
    previousElementSibling.innerText

    let fechaNacActual = event.currentTarget.parentElement.previousElementSibling.
    previousElementSibling.
    previousElementSibling.previousElementSibling.innerText

    let pagoActual = event.currentTarget.parentElement.
    previousElementSibling.previousElementSibling.innerText

    let telefonoActual = event.currentTarget.parentElement.previousElementSibling.
    previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling
    .previousElementSibling.innerText

    console.log(idActual +" id");
    console.log(nombreActual + "nombre");
    console.log(apellidoActual +" apellido");
    console.log(contraseñaActual + " contra");
    console.log(correoActual + " correo");
    console.log(nivelActual + " nivel");
    console.log(cuentaActual + "cuenta");
    console.log(puntosActual + " puntos");
    console.log(fechaNacActual + " fecha");
    console.log(pagoActual + " pago");
    console.log(telefonoActual + "telefono");

    
   

     

    document.getElementById('nombreEditar').value = nombreActual
    document.getElementById('apellidoEditar').value = apellidoActual
    document.getElementById('contraseñaEditar').value = contraseñaActual
    document.getElementById('fechaEditar').value = fechaNacActual
    document.getElementById('pagoEditar').value = pagoActual
    document.getElementById('telefonoEditar').value = telefonoActual 
    document.getElementById('nivelEditar').value = nivelActual
    document.getElementById('cuentaEditar').value = cuentaActual

   let btnEditar = document.getElementById('ActualizarBtn')
   btnEditar.addEventListener("click",function(event){
       event.preventDefault()
       let datosActualizar = {
        nombre:  document.getElementById('nombreEditar').value,
        apellido: document.getElementById('apellidoEditar').value,
        password:  document.getElementById('contraseñaEditar').value,
        fechaNacimiento: document.getElementById('fechaEditar').value,
        metodoPago: document.getElementById('pagoEditar').value,
        telefono: document.getElementById('telefonoEditar').value,
        puntos: puntosActual,
        correo: correoActual,
        membresia: document.getElementById('nivelEditar').value,
        tipoUsuario: document.getElementById('cuentaEditar').value

    }

    let datosJSON = JSON.stringify(datosActualizar)
    let urlEditar = "http://localhost:3000/usuarios/"+idActual
    fetch(urlEditar, {
        method : 'PUT',
        body:[datosJSON],
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json())
    .catch(error => console.log("Error: ", error))
    .then(res => console.log(res))
   }) 
   
}

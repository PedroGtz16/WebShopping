'use strict'

let urlProductos = "http://localhost:3000/productos"
fetch(urlProductos,{
    method : 'GET',
    headers :{
        'Content-Type': 'application/json'
    }
}).then(res => res.json())
.then(function(myJson){

    let htmlProductos = new Array(myJson.length)
    for(let i = 0; i < myJson.length;i++){
        htmlProductos[i] = `
        <tr>
        <td>${myJson[i].nombre}</td>
        <td>${myJson[i].proveedor}</td>
        <td>${myJson[i].numeroSerie}</td>
        <td>${myJson[i].precio}</td>
        <td>${myJson[i].rating}</td>
        <td>${myJson[i].descripcion}</td>
        <td>${myJson[i].puntosOtorgados}</td>
        <td>${myJson[i].id}</td>
        <td class="text-center">
                <a href="#" class="btn btn-primary mt-2" id="btnEdit" data-toggle="modal" data-target="#Edicion" onclick=  "editar(event) "><i class="fas fa-pencil-alt edit "></i></a>
                <a  class="btn btn-primary mt-2" data-toggle="modal" data-target="#Borrar" id="btnRemove" onclick = "eliminar(event)"><i class="fas fa-trash-alt  remove "></i></i></a>
            </td>
    </tr>
        `
    }
    
    let divProductos = document.getElementById('listaProductos')
    for(let i = 0; i < myJson.length; i++){
        divProductos.insertAdjacentHTML('afterend', htmlProductos[i])
    }
})




//************************** */
//********************* */
//Guardar los productos en una variable

let arregloProductos
fetch(urlProductos,{
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }
}).then(res=> res.json())
.then(function(myJson){
    arregloProductos = myJson
})





//************************** */
//************************** */
//Eliminar productos

function eliminar(event){
    event.preventDefault()

   let idActual = event.currentTarget.parentElement.previousElementSibling.innerText // obtener el id del producto seleccionado
    // console.log(idActual);


    let btnConfirmarDelete = document.getElementById('btnEliminar') // posicionarse en el botno rojo del modal delete


    // buscar el producto por id y eliminarlo si existe
    for(let i = 0; i < arregloProductos.length; i++){
        if(arregloProductos[i].id == idActual){ // si existe el producto, eliminarlo
            btnConfirmarDelete.addEventListener("click",function(event){
                event.preventDefault()
                let urlDelete =  "http://localhost:3000/productos/"+idActual

                fetch(urlDelete,{
                    method: 'DELETE',
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(res => res.json())
                .catch(error=>console.log("Error: ",error))
                .then(response => console.log("Producto eliminado: ",response))
            })
        }
    }
}


//************************** */
//************************** */
//Editar productos

function editar(event){
    event.preventDefault()

    let idActual = event.currentTarget.parentElement.previousElementSibling.innerText

    for(let i = 0; i < arregloProductos.length; i++){
        if(arregloProductos[i].id == idActual){ // si existe el producto, editar sus atributos
            
            document.getElementById('nombreEditar').value = arregloProductos[i].nombre 
            document.getElementById('proveedorEditar').value = arregloProductos[i].proveedor 
            document.getElementById('numeroSerieEditar').value = arregloProductos[i].numeroSerie 
            document.getElementById('precioEditar').value = arregloProductos[i].precio 
            document.getElementById('ratingEditar').value = arregloProductos[i].rating 
            document.getElementById('descripcionEditar').value = arregloProductos[i].descripcion 


            let btnEditar = document.getElementById('ActualizarBtn')
           
            btnEditar.addEventListener("click",function(event){
              event.preventDefault()
              
              let datosActualizar ={
                  nombre : document.getElementById('nombreEditar').value,
                  proveedor:  document.getElementById('proveedorEditar').value ,
                  numeroSerie: document.getElementById('numeroSerieEditar').value ,
                  precio: document.getElementById('precioEditar').value,
                  rating:document.getElementById('ratingEditar').value,
                  descripcion:document.getElementById('descripcionEditar').value ,
                  puntosOtorgados: arregloProductos[i].puntosOtorgados ,
                  id: arregloProductos[i].id
              }  

              let datosJSON = JSON.stringify(datosActualizar)
              let urlEditar = "http://localhost:3000/productos/"+idActual
              fetch(urlEditar,{
                method: 'PUT',
                body: [datosJSON],
                headers:{
                    'Content-Type':'application/json'
                }
              }).then(res=>res.json())
            }).catch(error => console.log("Error: ",error))
            .then(res => console.log(res))
        }
    }

}
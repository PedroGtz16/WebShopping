'use strict'

let urlVentas = "http://localhost:3000/ventas"
fetch(urlVentas,{ // obtener todos los usuarios en formato JSON
    method: 'GET',
    headers:{
        'Content-Type':'application/json'
    }
}).then(response=>response.json())
.then(function(myJson){
    
    let htmlVentas = new Array(myJson.length) // array de htmls que almacena cada usuario
    for(let i = 0; i < myJson.length; i++){
        htmlVentas[i] = `
        <tr>
                <td>${myJson[i].nombre}</td>
                <td>${myJson[i].cantidad}</td>
                <td>${myJson[i].fechaVenta}</td>
                <td>${myJson[i].precioProducto}</td>
                <td>${myJson[i].ganancia}</td>
                <td>${myJson[i].id}</td>
                <td class="text-center">
                        <a href="#" class="btn btn-primary mt-2" id="btnEdit" data-toggle="modal" data-target="#Edicion" onclick=  "editar(event) "><i class="fas fa-pencil-alt edit "></i></a>
                        <a  class="btn btn-primary mt-2" data-toggle="modal" data-target="#Borrar" id="btnRemove" onclick = "eliminar(event)"><i class="fas fa-trash-alt  remove "></i></i></a>
                    </td>
            </tr>
        `
    }
    
    let divVentas = document.getElementById('listaVentas') // guarda el div donde se insertara cada html
    for(let i = 0; i < myJson.length; i++){
        divVentas.insertAdjacentHTML('afterend',htmlVentas[i])
    }
})



//************************** */
//********************* */
//Guardar las ventas en una variable

let arregloVentas
fetch(urlVentas,{
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }
}).then(res=> res.json())
.then(function(myJson){
    arregloVentas = myJson
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
    for(let i = 0; i < arregloVentas.length; i++){
        if(arregloVentas[i].id == idActual){ // si existe el producto, eliminarlo
            btnConfirmarDelete.addEventListener("click",function(event){
                event.preventDefault()
                let urlDelete =  "http://localhost:3000/ventas/"+idActual

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

    for(let i = 0; i < arregloVentas.length; i++){
        if(arregloVentas[i].id == idActual){ // si existe el producto, editar sus atributos
            
            document.getElementById('nombreEditar').value = arregloVentas[i].nombre 
            document.getElementById('cantidadEditar').value = arregloVentas[i].cantidad 
            document.getElementById('fechaEditar').value = arregloVentas[i].fechaVenta 
            document.getElementById('precioEditar').value = arregloVentas[i].precioProducto 



            let btnEditar = document.getElementById('ActualizarBtn')
           
            btnEditar.addEventListener("click",function(event){
              event.preventDefault()
              
              let datosActualizar ={
                  nombre : document.getElementById('nombreEditar').value,
                  cantidad:  document.getElementById('cantidadEditar').value ,
                  fechaVenta: document.getElementById('fechaEditar').value ,
                  precioProducto: document.getElementById('precioEditar').value,
                  ganancia:document.getElementById('cantidadEditar').value * document.getElementById('precioEditar').value,
                  id: arregloVentas[i].id
              }  

              let datosJSON = JSON.stringify(datosActualizar)
              let urlEditar = "http://localhost:3000/ventas/"+idActual
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
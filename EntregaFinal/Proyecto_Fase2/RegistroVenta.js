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
let cantidad = document.getElementById('cantidad').value
let fechaVenta = document.getElementById('fecha').value
let precio = document.getElementById('precio').value


datosRegistro = {
    nombre: nombre,
    cantidad: cantidad,
    fechaVenta: fechaVenta,
    precioProducto: precio,
    ganancia : cantidad * precio
   }

   
let datosJSON = JSON.stringify(datosRegistro)
let urlUser = "http://localhost:3000/ventas"

fetch(urlUser, {
    method: 'POST',
    body:[datosJSON],
    headers:{
        'Content-Type':'application/json'
    }
}).then(res => res.json())
.catch(error => console.log('Error: ',error))
.then(response => {
    console.log('Venta registrada: ',response)})
    console.log(alert('Venta registrada'));
    window.location.href = "RegistroVenta.html" 
})
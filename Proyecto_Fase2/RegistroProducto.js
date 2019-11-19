document.getElementById("ProductoSubmit").disabled = true

let formulario = document.querySelector('form')
formulario.addEventListener("change",()=>{
    let inputs = document.querySelectorAll("#login input:invalid") // coleccion de inputs
    if(inputs.length >= 1){ // si existe al menos un elemento invalido
        document.getElementById('ProductoSubmit').disabled = true
    }
    else{
        document.getElementById('ProductoSubmit').disabled = false // activar el boton submit si todo esta correcto
    }
})

let submit = document.getElementById('ProductoSubmit')
let datosRegistro
submit.addEventListener("click",function(event){
    event.preventDefault()

    let nombre = document.getElementById('name').value
    let proveedor = document.getElementById('provider').value
    let numeroSerie = document.getElementById('serialNumber').value
    let precio = document.getElementById('price').value
    let rating = document.getElementById('rating').value
    let descripcion = document.getElementById('description').value

    datosRegistro = {
        nombre: nombre,
        proveedor : proveedor,
        numeroSerie : numeroSerie,
        precio : precio,
        rating : rating,
        descripcion : descripcion,
        puntosOtorgados : (precio / 10) * .75
    }


    let datosJSON = JSON.stringify(datosRegistro)
    let urlProductos = "http://localhost:3000/productos"

    fetch(urlProductos,{
        method : 'POST',
        body: [datosJSON],
        headers:{
            'Content-Type':'application/json'
        }   
    }).then(res => res.json())
    .catch(error => console.log('Error ', error))
    .then(()=>{
        console.log(alert('Producto Registrado'))
        window.location.href = "RegistroProducto.html"
    })

})
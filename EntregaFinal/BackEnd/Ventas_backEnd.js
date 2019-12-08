const {mongoose}= require('./mongoDB-connect')

let ventaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    fechaVenta:{
        type: Date, 
        required: true
    },
    precioProducto:{
        type: Number,
        required: true
    },
    ganancia:{
        type: Number
    },
    id:{
        type: Number,
        required: true
    }
})

// Crear modelo que requiere del esquema
let ventasModelo = mongoose.model('Ventas', ventaSchema)


// let nuevaVenta ={
//     nombre: 'Jordan Nike',
//     cantidad: 2,
//     fechaVenta: '2019-02-02',
//     precioProducto: 2300,
//     id: 1
// }

// let venta = ventasModelo(nuevaVenta)


// crearVenta(venta)


//crea nueva venta; No necesita validación porque puede haber diferentes
//ventas con los mismos atributos, solamente el id es diferente
async function crearVenta(venta,id){ 
    let ventas = await obtenerVenta(id)
    if(ventas.length > 0){
        console.log("Venta ya existente");
        return -1
    } else if(ventas.length == 0){
        let doc = await venta.save()
        if(doc) console.log(doc);
    }
    
}

//regresa todas las ventas
async function regresarVentas(){
    let doc = await ventasModelo.find({})
    return doc
}

// regresa una venta dado un id especifico
async function obtenerVenta(id){
    let doc = await ventasModelo.find({'id':id})
    return doc
}

// eliminar venta por id
async function eliminarVenta(idVenta){
    let doc = obtenerVenta(idVenta)
    try{
        if(doc.length == 1){
            await ventasModelo.findOneAndDelete(doc)
            return 1
        }else return 0
        
    }catch(e){
        console.log("Error: Venta no encontrada");
        if(e) return 0
    }
}


// Actualizar venta
async function actualizarVenta(datos, id){
    ventasModelo.findOneAndUpdate({'id':id},datos, {new:true})
    .then((doc)=>{
        console.log(doc);
        return 1
    })
    .catch((e)=>{
        console.log(e);
        return -1
    })
}

// Actualiza la ganancia
async function actualizarGanancia(id){
    let cantidad = regresarCantidad(id)
    let precio = regresarPrecio(id)
    let ganancia = precio * cantidad

    ventasModelo.findOneAndUpdate({'id':id},{'ganancia':ganancia},{new:true})
    .then((doc)=>{
        console.log(doc);
        return 1
    })
    .catch((e)=>{
        console.log(doc);
        return -1
    })
}

// regresa la cantidad de una venta
async function regresarCantidad(id){
    let doc = await ventasModelo.findOne({'id':id}, 'cantidad')
    return doc.ganancia
}

// regresa el precio de una venta
async function regresarPrecio(id){
    let doc = await ventasModelo.findOne({'id':id},'precioProducto')
    return doc.precioProducto
}

module.exports = {ventasModelo, crearVenta, eliminarVenta, regresarVentas, actualizarVenta, actualizarGanancia}
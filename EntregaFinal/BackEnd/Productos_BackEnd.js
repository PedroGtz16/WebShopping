const {mongoose} = require('./mongoDB-connect')

let productoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    proveedor:{
        type: String,
        required: true
    },
    numeroSerie:{
        type: String, 
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    rating: {
        type: Number, 
        required: true,
        enum: [1,2,3,4,5]
    },
    descripcion:{
        type: String,
        required: true
    },
    puntosOtorgados:{
        type: Number
    },
    id:{
        type: Number,
        required: true
    }
})

let productosModelo = mongoose.model('Productos', productoSchema)

//let docs = obtenerProducto('AQE-234')
// console.log(docs.length);

// async function prueba(){
//     let doc = await obtenerProducto('AQE-234')
//     console.log(doc.length)
// }
// prueba()

//Se crea producto, pero se valida por medio del numero de serie
async function crearProducto(producto, numeroSerie){
    let productos = await obtenerProducto(numeroSerie)
    // console.log(productos.length);
    if(productos.length > 0){ // si el producto ya existe. doc deberia estar vacio si no existe el producto
        console.log("Producto ya existente");
        return -1
    }else if(productos.length == 0){
        let doc = await producto.save()
        if(doc) console.log(doc);
    }
}

async function obtenerProducto(numeroSerie){ // regresa producto por numero de serie
    let docs = await productosModelo.find({'numeroSerie': numeroSerie})
    console.log(docs);
    return docs 
}


async function regresarProductos(){ // regresa todos los productos
    let docs = await productosModelo.find({})
    return docs
}

async function eliminarProducto(numeroSerie){ // elimina producto por medio del numero de serie
    let doc = await obtenerProducto(numeroSerie)
    if(doc.length == 1){
        productosModelo.findOneAndDelete(doc)
        console.log("Producto eliminado");
        return 1
    }else{
        console.log("Producto no eliminado");
        return -1
    }
}

// Actualiza el producto
async function actualizarProducto(datos, numeroSerie){
    let doc = await obtenerProducto(numeroSerie)
    if(doc.length == 1){
        productosModelo.findOneAndUpdate({'numeroSerie':numeroSerie},datos, {new:true})
        .then((doc)=>{
            console.log(doc);
            return 1
        })
        .catch((e)=>{
            console.log(e);
            return -1
        })
    }
}

async function actualizarPuntos(numeroSerie){ // actualiza el atributo  faltante de productos
    let doc = await obtenerProducto(numeroSerie)
    if(doc.length == 1){
        let puntos = await regresarPrecio(numeroSerie)
        puntos = (puntos * .25) / 7 // funcion para asignar los puntos otorgados
        productosModelo.findOneAndUpdate({'numeroSerie':numeroSerie},{'puntosOtorgados': puntos} )
    }
}

// regresa el precio de un producto dado un numero de serie
async function regresarPrecio(numeroSerie){
    let doc = await productosModelo.findOne({'numeroSerie': numeroSerie},'precio')
    return doc.precio
}

// prueba('AQE-234')
// actualizarProducto('AQE-234')

module.exports = {productosModelo, crearProducto, obtenerProducto, regresarProductos, eliminarProducto, actualizarPuntos, actualizarProducto}
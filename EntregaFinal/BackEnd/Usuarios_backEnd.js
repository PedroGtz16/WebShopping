const {mongoose} = require('./mongoDB-connect')

let usuarioSchema = mongoose.Schema({
    nombre:{
        type: String, 
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    fechaNacimiento:{
        type: Date,
        required: true
    },
    metodoPago: {
        type: String
    },
    telefono: {
        type: Number,
        required: true
    },
    puntos:{
        type: Number
    },
    correo:{
        type: String,
        required: true
    },
    membresia:{
        type: String
    },
    tipoUsuario:{
        type: String,
        enum:['USUARIO','ADMIN'],
        required: true
    },
    id:{
        type: Number
    },
    token:{
        type: String
    }
})

//Crear mdelo que requiere del esquema
let usuariosModelo = mongoose.model('Usuarios', usuarioSchema) // Usuarios hace referencia a la coleccion Usuarios en la base de datos de MongoDB

// let nuevoUsuario = {
//     nombre: 'Alfonso',
//     apellido: 'Ramirez',
//     password: '123',
//     fechaNacimiento: '2019-11-26',
//     telefono: '12345',
//     correo: '12@1235',
//     tipoUsuario: 'ADMIN',
//     id: 1
// }

// let usuario = usuariosModelo(nuevoUsuario)
 
//  crearUsuario(usuario, '12@1235')
// let usuarios = obtenerUsuario('12@12')
// async function auida(){

// let doc = await obtenerUsuario('12@1234')
//  console.log(doc.length);
// }


async function crearUsuario(user, correo){
    let doc = await obtenerUsuario(correo) // se verifica si ya existe el correo
    // console.log(doc.length);
    if( doc.length > 0){ // si el usuario ya existe
        console.log("Usuario ya existente");
        return -1
    } else if (doc.length == 0){ // usuario no existente

    let doc =  await user.save()
        if(doc) console.log(doc);
    }
}




 async function obtenerUsuario(correo){ // busca usuario por correo
     let docs = await usuariosModelo.find({'correo': correo})
    //   console.log(docs);
     return docs
    
}

//  obtenerUsuario("1")

async function eliminarUsuario(correoUsuario){ // elimina usuario por correo
    let doc = obtenerUsuario(correoUsuario)
    try{
        await usuariosModelo.findOneAndDelete(doc)
        return 1     
    }catch(e){
        console.log("Error : Usuario no encontrado");
        if(e) return 0
    } 
}

async function regresarUsuarios(){ // Regresa todos los usuarios
    let doc = await usuariosModelo.find({})
            // console.log(doc);
            return doc
        }


// Actualiza un usuario
async function actualizarUsuario(datos,correo){
    usuariosModelo.findOneAndUpdate({'correo':correo}, datos, {new:true})
    .then((doc)=>{
        console.log(doc);
        return 1
    })
    .catch((e)=>{
        console.log(e);
        return -1
    })
    
}


// let doc =  regresarUsuarios()
// console.log(doc);
// crearUsuario(usuario)

module.exports = {usuariosModelo, crearUsuario, eliminarUsuario, obtenerUsuario, regresarUsuarios, actualizarUsuario}
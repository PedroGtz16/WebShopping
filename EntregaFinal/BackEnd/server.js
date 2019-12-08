'use strict'
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const {usuariosModelo, crearUsuario, eliminarUsuario, regresarUsuarios, actualizarUsuario} = require('./Usuarios_backEnd') // importar funciones usuarios
const {ventasModelo,crearVenta, eliminarVenta, regresarVentas, actualizarGanancia, actualizarVenta} = require('./Ventas_backEnd') // importar funciones ventas
const {productosModelo, crearProducto, regresarProductos, eliminarProducto, actualizarPuntos, actualizarProducto} = require('./Productos_BackEnd') //importar funciones productos
const port = 3000

app.use(express.json())

app.listen(port, () => console.log(`http://localhost:${port}`))



  //Middle ware para verificar token
  function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != undefined){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }
    else{
        return req.sendStatus(403)
    }
}



//verificar el login
app.route('/api/login')
    .post(verifyToken,(req,res)=>{
        jwt.verify(req.token, 'secretKey',(err, authData)=>{
            if(err){
                return res.sendStatus(403)
            }
            else{
                return res.json({
                    message: 'Created post',
                    authData
                })
            }
        })
    })

  
// ******************RUTA PARA USUARIOS********************
// *******************************************************

//ruta para usuarios: obtener usuarios, registrar usuarios, y editar usuarios 
app.route('/api/usuarios')
    .get(async (req,res)=>{ // regresa los usuarios
        let usuarios = await regresarUsuarios()
        console.log(usuarios);
        return res.status(200).send(usuarios)
    })

    .post(async(req,res)=>{ // crea un usuario con token
        // console.log(req.body);
        let usuario = usuariosModelo(req.body)

        jwt.sign({usuario},'secretKey',(err, token)=>{
           return  res.json({
                message: 'Token creado',
                token: token
            })
        })
        
        if(await crearUsuario(usuario, req.body.correo) == -1){
            return res.status(200).send(req.body)
        }else{
            return res.status(400).send('Usuario ya existente')
        }
        // return res.status(200).send(req.body)
    })
    
    
    

 //Eliminar usuario por correo
app.route('/api/usuarios/:correo')
.delete((req,res)=>{
    // console.log(req.params.correo);
     let resultado = eliminarUsuario(req.params.correo)
    if(resultado == 1) return res.status(200).send("Usuario eliminado")
    else return res.status(400).send("Usuario no eliminado")
})   
.put(async(req,res)=>{ // actualiza usuario
    let doc = await actualizarUsuario(req.body, req.body.correo)
    if(doc == 1){
        return res.status(200).send(req.body)
    }else{
        return res.status(400).send("Actualización erronea")
    }
})



// ******************RUTA PARA VENTAS********************
// ****************************************************
app.route('/api/ventas')
    .get(async (req,res)=>{ // regresa todas las ventas
        let ventas = await regresarVentas()
        console.log(ventas);
        return res.status(200).send(ventas)
    })

    .post(async (req,res)=>{  // crea nueva venta
    let venta = ventasModelo(req.body)
    try{
        let doc = await crearVenta(venta, req.body.id)
        if (doc == -1)return res.status(400).send("Venta ya existente")
        else return res.status(200).send(req.body)
    }catch(e){
        return res.status(400).send("Error al crear nueva venta")
    }

    })

    


app.route('/api/ventas/:id') // eliminar venta por id
    .delete(async (req,res)=>{
        let resultado = await eliminarVenta(req.params.id)
        if(resultado == 1) return res.status(200).send("Venta eliminada")
        else return res.status(400).send("Venta no eliminada")
    })
    .put(async(req,res)=>{ // actualizar venta
        let doc = await actualizarVenta(req.body, req.body.id)
        if(doc == 1){
            return res.status(200).send(req.body)
        }
        else return res.status(400).send("Actualización erronea")
    })



// ******************RUTA PARA PRODUCTOS********************
// ********************************************************

app.route('/api/productos') // regresa todos los productos
    .get(async (req,res)=>{
        let productos = await regresarProductos()
        console.log(productos);
        return res.status(200).send(productos)
    })

    .post(async(req,res)=>{ // crea un nuevo producto
        let producto = productosModelo(req.body)
        try{
            let doc = await crearProducto(producto, req.body.numeroSerie)
            if(doc == -1) return res.status(400).send("Producto ya registrado")
            else return res.status(200).send(req.body)
        }catch(e){
            return res.status(400).send("Error al crear el producto")
        }
    })

app.route('/api/productos/:numeroSerie')
.delete(async (req,res)=>{
    let resultado = await eliminarProducto(req.params.numeroSerie)
    if(resultado == 1){
        return res.status(200).send("Producto eliminado")
    }else{
        return res.status(400).send("Producto no eliminado")
    }

})
.put(async(req,res)=>{
    let doc = await actualizarProducto(req.body, req.body.numeroSerie)
    if(doc == 1){
        return res.status(200).send(req.body)
    }
    else return res.status(400).send("Actualizacipn erronea")
})
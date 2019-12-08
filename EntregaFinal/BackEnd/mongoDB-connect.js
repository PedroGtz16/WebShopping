const mongoose = require('mongoose')
const config = require('./config.json')

let mongoDB = `mongodb+srv://${config.username}:${config.password}@cluster0-2oqcc.mongodb.net/${config.dbname}?retryWrites=true&w=majority`

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then( ()=> {
    console.log('Conectado a la base de datos');
}).catch((err)=>{
    console.log('No conectado a la base de datos',err);
})

module.exports = {mongoose}
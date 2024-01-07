const express = require('express');
const cors = require('cors');
const reload = require('reload');
const app = express();
app.use(cors()); //Para que se pueda acceder desde cualquier lugar
app.use(express.json()); //Para trabajar con JSON

//Ahora definimos la rutas
const router = require('./routes'); //Importamos las rutas de la carpeta routes
app.use('/', router); 

const server = require('http').Server(app);
reload(app);
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'
server.listen(PORT, HOST, ()=>{
    console.log(`Server running on port ${PORT}`);
})
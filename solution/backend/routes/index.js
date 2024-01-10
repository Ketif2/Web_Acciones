const express = require('express'); //Express
const cors = require('cors'); //Comunicación a otros servidores
const reload = require('reload');
const app = express();//Funcion express
app.use(cors()); //Para que se pueda acceder desde cualquier lugar usando la app
app.use(express.json()); //Para trabajar con JSON

//Ahora definimos la rutas
const router = require('./routes'); //Importamos las rutas de la carpeta routes
app.use('/', router); 

const server = require('http').Server(app);//Levanta servidor
reload(app);
const PORT = process.env.PORT || 3000; //Mapear puertos
const HOST = '0.0.0.0' //Declarar host
server.listen(PORT, HOST, ()=>{
    console.log(`Server running on port ${PORT}`);
})
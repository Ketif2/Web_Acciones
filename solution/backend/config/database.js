var admin = require("firebase-admin"); //Crear un administrador usando la dependencia de firebase-admin (variable global admin)

var serviceAccount = require("./accessKey.json"); //Crea una cuenta de servicio asignandole un archivo json

admin.initializeApp({//Metodo de la dependencia (Libreria)
  credential: admin.credential.cert(serviceAccount) //Se le pone el json con las credenciales
});
var db = admin.firestore(); //crea la varaible db como un modulo exportable 
module.exports = db;

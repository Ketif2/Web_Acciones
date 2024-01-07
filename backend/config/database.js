var admin = require("firebase-admin");

var serviceAccount = require("./accessKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
module.exports = db;

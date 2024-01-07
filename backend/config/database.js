var admin = require("firebase-admin");

var serviceAccount = require("./constructioncrud-firebase-adminsdk-f8x7w-70ce82418e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
module.exports = db;

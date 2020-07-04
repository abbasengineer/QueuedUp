const admin = require("firebase-admin");
let serviceAccount = require("../keys/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://queuedup-123.firebaseio.com",
});

module.exports = { admin };

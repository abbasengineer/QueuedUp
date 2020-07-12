const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCUyneAX3spOSDSoNcM4a7Rwcz1SVDZ0ko",
  authDomain: "queuedup-123.firebaseapp.com",
  databaseURL: "https://queuedup-123.firebaseio.com",
  projectId: "queuedup-123",
  storageBucket: "queuedup-123.appspot.com",
  messagingSenderId: "352874916508",
  appId: "1:352874916508:web:53d9a126b488d888d0db59",
  measurementId: "G-FD72H5X19N",
};

firebase.initializeApp(firebaseConfig);

module.exports = { firebase, firebaseConfig };

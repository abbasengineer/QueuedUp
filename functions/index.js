const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const app = express();

admin.initializeApp();

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

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

// route for retreiving posts from firestore
app.get("/getposts", (request, response) => {
  admin
    .firestore()
    .collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let posts = [];

      data.forEach((doc) => {
        posts.push({
          postID: doc.id,
          username: doc.data().username,
          content: doc.data().content,
          createdAt: new Date().toISOString(),
        });
      });

      return response.json(posts);
    })
    .catch((err) => console.error(err));
});

// route for inserting a new post
app.post("/addpost", (request, response) => {
  const newPost = {
    username: request.body.username,
    content: request.body.content,
    createdAt: new Date().toISOString(),
  };

  admin
    .firestore()
    .collection("posts")
    .add(JSON.parse(JSON.stringify(newPost)))
    .then((doc) => {
      response.json({
        msg: `created document ${doc.id}`,
      });
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({ error: err.code });
    });
});

// signup route
app.post("/signup", (request, response) => {
  const newUser = {
    fullName: request.body.fullName,
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  };

  let token;
  let userID;

  admin
    .firestore()
    .doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      // unique usernames only!
      if (doc.exists) {
        return response
          .status(400)
          .json({ username: "Username already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userID = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        userID,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
      };

      return admin
        .firestore()
        .doc(`/users/${newUser.username}`)
        .set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);

      if (err.code === "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email already in use" });
      } else {
        return response.status(500).json({ error: err.code });
      }
    });
});

// routing
exports.api = functions.https.onRequest(app);

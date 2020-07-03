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
const { auth } = require("firebase-admin");
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

const isBlank = (string) => {
  if (string.trim() === "") return true;
  return false;
};

const isUCSCEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@ucsc.edu$/;

  if (email.match(regex)) return true;
  return false;
};

// route for signing up
app.post("/signup", (request, response) => {
  const newUser = {
    fullName: request.body.fullName,
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  };

  let errors = {};

  if (isBlank(newUser.fullName)) errors.fullName = "Must provide full name";
  if (isBlank(newUser.username)) errors.username = "Must provide username";

  if (isBlank(newUser.email)) errors.email = "Must provide email";
  else if (!isUCSCEmail(newUser.email))
    errors.email = "Must use @ucsc.edu email";

  if (isBlank(newUser.password)) errors.password = "Must provide password";
  if (isBlank(newUser.confirmPassword))
    errors.confirmPassword = "Must confirm password";

  if (Object.keys(errors).length > 0) return response.status(400).json(errors);

  let token;
  let userID;

  admin
    .firestore()
    .doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists)
        return response
          .status(400)
          .json({ username: "Username already taken" });

      return firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
    })
    .then((credential) => {
      userID = credential.user.uid;
      token = credential.user.getIdToken();

      return token;
    })
    .then((IDToken) => {
      token = IDToken;

      // build user document
      const userCredentials = {
        userID,
        fullName: newUser.fullName,
        email: newUser.email,
        username: newUser.username,
        createdAt: new Date().toISOString(),
      };

      // create and store in database
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

      if (err.code === "auth/email-already-in-use")
        return response.status(400).json({ email: "Email already in use" });

      return response
        .status(500)
        .json({ error: err.code, message: err.message });
    });
});

// route for logging in
app.post("/login", (request, response) => {
  const existingUser = {
    email: request.body.email,
    password: request.body.password,
  };

  let errors = {};

  if (isBlank(existingUser.email)) errors.email = "Must provide email";
  if (isBlank(existingUser.password)) errors.password = "Must provide password";

  if (Object.keys(errors).length > 0) return response.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(existingUser.email, existingUser.password)
    .then((credential) => {
      return credential.user.getIdToken();
    })
    .then((token) => {
      return response.json({ token });
    })
    .catch((err) => {
      console.error(err);
      return response.status(403).json({ info: "Incorrect login information" });
    });
});

// routing
exports.api = functions.https.onRequest(app);

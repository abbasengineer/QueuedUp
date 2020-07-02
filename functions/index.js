const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const app = express();

admin.initializeApp();

var firebaseConfig = {
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

// route for retrieving posts from firestore
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
          createdAt: doc.data().createdAt,
        });
      });

      return response.json(posts);
    })
    .catch((err) => console.log(err));
});

// route for creating a new post
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
        msg: `success: created document ${doc.id}`,
      });
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({ error: err.code });
    });
});

const isBlank = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

// signup route (for first time users, after Google login)
app.post("/signup", (request, response) => {
  let user = firebase.auth().currentUser;

  if (!user) {
    return response.status(403).json({ error: "Must login with Google first" });
  }

  const newUser = {
    fullName: request.body.fullName,
    username: request.body.username,
  };

  let token;
  let userID;

  // user may have kept a field blank
  let blank = {};

  newUser.forEach((element) => {
    if (isBlank(element)) {
      empty.element = "Field cannot be blank";
    }
  });

  if (Object.keys(blank).length > 0) return response.status(400).json(blank);

  // check database for username
  admin
    .firestore()
    .doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      // unique usernames only!
      if (doc.exists) {
        return response
          .status(400)
          .json({ username: "Username already in use" });
      } else {
        return firebase.auth().currentUser;
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
        email: firebase.auth().currentUser.email,
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
      return result.status(403).json({ error: err.code, msg: err.message });
    });
});

// login route
app.get("/login", () => {
  let user = firebase.auth().currentUser;

  if (user) {
    return response.status(200).json({ msg: `User is already logged in` });
  }

  let provider = new firebase.auth.GoogleAuthProvider(); // for Google login

  // UCSC emails only
  provider.setCustomParameters({
    hd: "ucsc.edu",
  });

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (credential) {
      //user = result.user; // signed in user info
      //userID = user.uid;

      let isNew = credential.additionalUserInfo.isNewUser;

      if (isNew) {
        /*
        TODO: redirect to signup
        */
      }
    })
    .catch(function (err) {
      console.error(err);
      return result.status(403).json({ error: err.code, msg: err.message });
    });
});

// routing
exports.api = functions.https.onRequest(app);

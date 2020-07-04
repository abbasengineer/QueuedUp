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

// with Express, use this middleware as an arg to a route; decides if to proceed
const authenticate = (request, response, next) => {
  let IDToken;

  // by convention, "Bearer " (before authorization token in an HTTP request)
  // authenticates the API request, granting access to the bearer
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer ")
  )
    IDToken = request.headers.authorization.split("Bearer ")[1];
  else {
    console.error("Unauthorized: no token found");
    return response.status(403).json({ error: "Unauthorized: no token found" });
  }

  admin
    .auth()
    .verifyIdToken(IDToken)
    .then((decodedToken) => {
      // decodedToken holds the user data inside our token -- add it to our
      // request objects so when the request proceeds forward to some route,
      // our request will have user data
      request.user = decodedToken;
      console.log(decodedToken);

      // limit our result to 1 document
      return admin
        .firestore()
        .collection("users")
        .where("userID", "==", request.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      // extract data from document and attach it to our request
      request.user.username = data.docs[0].data().username;

      return next(); // allow request to proceed
    })
    .catch((err) => {
      console.error("Token verification: ", err);
      return response
        .status(403)
        .json({ error: err.code, message: err.message });
    });
};

const isBlank = (string) => {
  if (string.trim() === "") return true;
  return false;
};

// route for inserting a new post
app.post("/addpost", authenticate, (request, response) => {
  if (isBlank(request.body.content))
    return response.status(400).json({ content: "Must provide post content" });

  // authenticate parameter ensures user is authenticated before adding a post,
  // so now our POST request only needs to contain the content!
  // TO TEST: send login request, copy returned token, send addpost request with
  // Authorizations header with value "Bearer token" (with the pasted token)
  const newPost = {
    username: request.user.username,
    content: request.body.content,
    createdAt: new Date().toISOString(),
  };

  admin
    .firestore()
    .collection("posts")
    .add(JSON.parse(JSON.stringify(newPost)))
    .then((doc) => {
      response.json({
        message: `Created document ${doc.id}`,
      });
    })
    .catch((err) => {
      console.error("Post creation: ", err);
      response.status(500).json({ error: err.code, message: err.message });
    });
});

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

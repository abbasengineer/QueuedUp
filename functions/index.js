const functions = require("firebase-functions");
const express = require("express");
const app = express();

const authenticate = require("./util/authenticate");
const { getPosts, addPost } = require("./handlers/posts");
const { signUp, logIn } = require("./handlers/users");

// route for retreiving all posts
app.get("/getposts", getPosts);

// route for inserting a new post
app.post("/addpost", authenticate, addPost);

// route for signing up
app.post("/signup", signUp);

// route for logging in
app.post("/login", logIn);

// route for API
exports.api = functions.https.onRequest(app);

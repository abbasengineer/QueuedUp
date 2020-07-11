const functions = require("firebase-functions");
const express = require("express");
const app = express();

const authenticate = require("./util/authenticate");
const {
  getPosts,
  addPost,
  getPost,
  addComment,
  deletePost,
} = require("./handlers/posts");
const { signUp, logIn } = require("./handlers/users");

// route for retreiving all posts
app.get("/getposts", getPosts);

// route for inserting a new post
app.post("/addpost", authenticate, addPost);

// route for retrieving a certain post
app.get("/getpost/:postID/", getPost);

// route for inserting a new comment on a post
app.post("/getpost/:postID/addcomment", authenticate, addComment);

// route for deleting a post
app.delete("/getpost/:postID", authenticate, deletePost);

// route for signing up
app.post("/signup", signUp);

// route for logging in
app.post("/login", logIn);

// route for API
exports.api = functions.https.onRequest(app);

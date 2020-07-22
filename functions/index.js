const functions = require("firebase-functions");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ origin: true }));

const authenticate = require("./util/authenticate");

const {
  getPosts,
  addPost,
  getPost,
  addComment,
  deletePost,
  editPost,
  incrementPost,
  decrementPost,
  unincrementPost,
  undecrementPost,
} = require("./handlers/posts");

const {
  signUp,
  logIn,
  addUserInfo,
  getUserInfo,
  getAuthUser,
  imageUpload,
} = require("./handlers/users");
const admin = require("./util/admin");

// post routes
app.get("/getposts", getPosts); // get all posts
app.post("/addpost", authenticate, addPost); // insert a new post
app.get("/getpost/:postID/", getPost); // get a certain post
app.post("/getpost/:postID/edit", authenticate, editPost); // edit a post
app.delete("/getpost/:postID", authenticate, deletePost); // delete a post
app.post("/getpost/:postID/addcomment", authenticate, addComment); // add comment
app.get("/getpost/:postID/increment", authenticate, incrementPost); // increment certain post
app.get("/getpost/:postID/decrement", authenticate, decrementPost); // decrement certain post
app.get("/getpost/:postID/unincrement", authenticate, unincrementPost); // un-increment a certain post
app.get("/getpost/:postID/undecrement", authenticate, undecrementPost); // un-decrement a certain post

// user routes
app.post("/signup", signUp); // sign up
app.post("/login", logIn); // log in
app.get("/user/:username", getUserInfo); // get a user's data
app.post("/user", authenticate, addUserInfo); // add a user's data
app.get("/user", authenticate, getAuthUser); // get a user's credentials
app.post("/user/image", authenticate, imageUpload); // upload a user image

exports.api = functions.https.onRequest(app);

exports.onDeletePost = functions.firestore
  .document("/posts/{postID}")
  .onDelete((snapshot, context) => {
    const postID = context.params.postID;
    const batch = admin.firestore().batch();

    return admin
      .firestore()
      .collection("comments")
      .where("postID", "==", postID)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(admin.firestore().doc(`/comments/${doc.id}`));
        });
      })
      .catch((error) => console.error(error));
  });

exports.onImageChange = functions.firestore
  .document("/users/{userID}")
  .onUpdate((imageChange) => {
    if (
      imageChange.before.data().imageUrl !== imageChange.after.data().imageURL
    ) {
      // atomic batch of writes to multiple documents
      const writeOps = admin.firestore().batch();

      return admin
        .firestore()
        .collection("posts")
        .where("username", "==", imageChange.before.data().username)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const post = admin.firestore().doc(`/getposts/${doc.id}`);

            writeOps.update(post, {
              imageURL: imageChange.after.data().imageURL,
            });
          });

          return writeOps.commit();
        });
    }

    return true;
  });

exports.api = functions.https.onRequest(app); // route for API

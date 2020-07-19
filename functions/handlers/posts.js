const { admin } = require("../util/admin");
const { isBlank } = require("../util/verifiers");

exports.getPosts = (request, response) => {
  admin
    .firestore()
    .collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((doc) => {
      let posts = [];

      doc.forEach((postDoc) => {
        posts.push({
          postID: postDoc.id,
          username: postDoc.data().username,
          content: postDoc.data().content,
          imageURL: postDoc.data().imageURL,
          createdAt: new Date().toISOString(),
          increments: postDoc.data().increments,
          decrements: postDoc.data().decrements,
        });
      });

      console.log(posts);
      return response.json(posts);
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({ error: "Error getting all posts" });
    });
};

/*
TO TEST:
  Send login request, copy returned token, send post request to route: /addpost
REQUEST HEADER:
  key: Authorizations. value: "Bearer <token>" (<token> is the pasted token)
REQUEST BODY FORMAT:
  { "content": "some message" }
*/
exports.addPost = (request, response) => {
  if (isBlank(request.body.content)) {
    return response.status(400).json({ content: "Must provide post content" });
  }

  // authenticate parameter ensures user is authenticated before adding a post,
  // so now our POST request only needs to contain the content
  const newPost = {
    username: request.user.username,
    content: request.body.content,
    imageURL: request.user.imageURL,
    createdAt: new Date().toISOString(),
    increments: 0,
    decrements: 0,
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
      response.status(500).json({ error: "Error creating a post" });
    });
};

exports.getPost = (request, response) => {
  let postData = {};

  admin
    .firestore()
    .doc(`/posts/${request.params.postID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Post not found" });
      }

      postData = doc.data();
      postData.postID = doc.id;

      return admin
        .firestore()
        .collection("comments")
        .where("postID", "==", request.params.postID)
        .orderBy("createdAt", "desc")
        .get();
    })
    .then((data) => {
      postData.comments = [];

      data.forEach((commentsDoc) => {
        postData.comments.push(commentsDoc.data());
      });

      return response.json(postData);
    })
    .catch((err) => {
      console.error(err);

      response.status(500).json({ error: "Comments not found" });
    });
};

/*
TO TEST:
  Send login request, copy returned token, send post request to route:
  /getpost/<postID>/addcomment (<postID> is the postID of the parent comment)
REQUEST HEADER:
  key: Authorizations. value: "Bearer <token>" (<token> is the pasted token)
REQUEST BODY FORMAT:
  { "content": "some message" }
*/
exports.addComment = (request, response) => {
  if (isBlank(request.body.content)) {
    return response
      .status(400)
      .json({ content: "Must provide comment content" });
  }

  // authenticate parameter ensures user is authenticated before adding a post,
  // so now our POST request only needs to contain the content!
  const newComment = {
    username: request.user.username,
    content: request.body.content,
    imageURL: request.user.imageURL,
    postID: request.params.postID,
    createdAt: new Date().toISOString(),
  };

  admin
    .firestore()
    .doc(`/posts/${request.params.postID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Comment not found" });
      }

      return admin
        .firestore()
        .collection("comments")
        .add(JSON.parse(JSON.stringify(newComment)));
    })
    .then(() => {
      response.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({ error: "Error adding comment" });
    });
};

exports.deletePost = (request, response) => {
  const document = admin.firestore().doc(`/posts/${request.params.postID}`);

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Post not found" });
      }

      if (doc.data().username !== request.user.username) {
        return response.status(403).json({ error: "Unauthorized user" });
      }

      return document.delete();
    })
    .then(() => {
      response.json({ message: "Post has been deleted" });
    })
    .catch((err) => {
      console.log(err);

      return response
        .status(500)
        .json({ error: error.code, message: "Error deleting the post" });
    });
};

exports.editPost = (request, response) => {
  if (isBlank(request.body.content)) {
    return response.status(400).json({ content: "Must provide new content" });
  }

  const editedContent = {
    content: request.body.content,
  };

  const document = admin.firestore().doc(`/posts/${request.params.postID}`);

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Post not found" });
      }

      if (doc.data().username !== request.user.username) {
        return response.status(403).json({ error: "Unauthorized user" });
      }

      return document.update(JSON.parse(JSON.stringify(editedContent)));
    })
    .then(() => {
      response.json({ message: "Post has been edited" });
    })
    .catch((err) => {
      console.log(err);

      return response
        .status(500)
        .json({ error: error.code, message: "Error editing the post" });
    });
};

exports.incrementPost = (request, response) => {
  let postData;
  const postDoc = admin.firestore().doc(`/posts/${request.params.postID}`);

  const incrementDoc = admin
    .firestore()
    .collection("increments")
    .where("username", "==", request.user.username)
    .where("postID", "==", request.params.postID)
    .limit(1);

  postDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postID = doc.id;

        return incrementDoc.get();
      }

      return response.status(404).json({ error: "Post not found " });
    })
    .then((data) => {
      // check if decremented
      admin
        .firestore()
        .collection("decrements")
        .where("username", "==", request.user.username)
        .where("postID", "==", request.params.postID)
        .limit(1)
        .get()
        .then((decData) => {
          if (!decData.empty) {
            return response
              .status(400)
              .json({ error: "Can't increment a post you decremented" });
          } else {
            if (postData.username === request.user.username) {
              return response
                .status(400)
                .json({ error: "Can't increment your own post" });
            }

            if (data.empty) {
              return admin
                .firestore()
                .collection("increments")
                .add({
                  postID: request.params.postID,
                  username: request.user.username,
                })
                .then(() => {
                  postData.increments++;

                  return postDoc.update({ increments: postData.increments });
                })
                .then(() => {
                  return response.json(postData);
                });
            } else {
              return response
                .status(400)
                .json({ error: "Already incremented this post" });
            }
          }
        });
    })
    .catch((err) => {
      console.log(err);

      response
        .status(500)
        .json({ error: err.code, message: "Error incrementing post" });
    });
};

exports.unincrementPost = (request, response) => {
  let postData;
  const postDoc = admin.firestore().doc(`/posts/${request.params.postID}`);

  const incrementDoc = admin
    .firestore()
    .collection("increments")
    .where("username", "==", request.user.username)
    .where("postID", "==", request.params.postID)
    .limit(1);

  postDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postID = doc.id;

        return incrementDoc.get();
      }

      return response.status(404).json({ error: "Post not found " });
    })
    .then((data) => {
      if (data.empty) {
        return response.status(400).json({
          error: "Error un-incrementing: post not incremented",
        });
      }

      return admin
        .firestore()
        .doc(`/increments/${data.docs[0].id}`)
        .delete()
        .then(() => {
          postData.increments--;

          return postDoc.update({ increments: postData.increments });
        })
        .then(() => {
          response.json(postData);
        });
    })
    .catch((err) => {
      console.log(err);

      response
        .status(500)
        .json({ error: err.code, message: "Error un-incrementing post" });
    });
};

exports.decrementPost = (request, response) => {
  let postData;
  const postDoc = admin.firestore().doc(`/posts/${request.params.postID}`);

  const decrementDoc = admin
    .firestore()
    .collection("decrements")
    .where("username", "==", request.user.username)
    .where("postID", "==", request.params.postID)
    .limit(1);

  postDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postID = doc.id;

        return decrementDoc.get();
      }

      return response.status(404).json({ error: "Post not found " });
    })
    .then((data) => {
      // check if incremented
      admin
        .firestore()
        .collection("increments")
        .where("username", "==", request.user.username)
        .where("postID", "==", request.params.postID)
        .limit(1)
        .get()
        .then((incData) => {
          if (!incData.empty) {
            return response
              .status(400)
              .json({ error: "Can't decrement a post you incremented" });
          } else {
            if (postData.username === request.user.username) {
              return response
                .status(400)
                .json({ error: "Can't decrement your own post" });
            }

            if (data.empty) {
              return admin
                .firestore()
                .collection("decrements")
                .add({
                  postID: request.params.postID,
                  username: request.user.username,
                })
                .then(() => {
                  postData.decrements++;

                  return postDoc.update({ decrements: postData.decrements });
                })
                .then(() => {
                  return response.json(postData);
                });
            } else {
              return response
                .status(400)
                .json({ error: "Already decremented this post" });
            }
          }
        });
    })
    .catch((err) => {
      console.log(err);

      response
        .status(500)
        .json({ error: err.code, message: "Error decrementing post" });
    });
};

exports.undecrementPost = (request, response) => {
  let postData;
  const postDoc = admin.firestore().doc(`/posts/${request.params.postID}`);

  const decrementDoc = admin
    .firestore()
    .collection("decrements")
    .where("username", "==", request.user.username)
    .where("postID", "==", request.params.postID)
    .limit(1);

  postDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postID = doc.id;

        return decrementDoc.get();
      }

      return response.status(404).json({ error: "Post not found " });
    })
    .then((data) => {
      if (data.empty) {
        return response.status(400).json({
          error: "Error un-decrementing: post not decremented",
        });
      }

      return admin
        .firestore()
        .doc(`/decrements/${data.docs[0].id}`)
        .delete()
        .then(() => {
          postData.decrements--;

          return postDoc.update({ decrements: postData.decrements });
        })
        .then(() => {
          response.json(postData);
        });
    })
    .catch((err) => {
      console.log(err);

      response
        .status(500)
        .json({ error: err.code, message: "Error un-decrementing post" });
    });
};

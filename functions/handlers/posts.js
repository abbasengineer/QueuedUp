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

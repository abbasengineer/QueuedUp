const { admin } = require("../util/admin");
const { isBlank } = require("../util/verifiers");

exports.getPosts = (request, response) => {
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
};

exports.addPost = (request, response) => {
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
};

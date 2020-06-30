const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello QueuedUp");
});

exports.getPosts = functions.https.onRequest((request, response) => {
    admin
        .firestore()
        .collection("Posts")
        .get()
        .then((data) => {
            let posts = [];

            data.forEach((doc) => {
                posts.push(doc.data());
            });

            return response.json(posts);
        })
        .catch((err) => console.log(err));
});

exports.createPost = functions.https.onRequest((request, response) => {
    const newPost = {
        body: request.body.body,
        userHandle: request.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    admin
        .firestore()
        .collection("Posts")
        .add(JSON.parse(JSON.stringify(newPost)))
        .then((doc) => {
            response.json({
                message: `successfully created document ${doc.id}`,
            });
        })
        .catch((err) => {
            response.status(500).json({ err: "error occurred!" });
            console.error(err);
        });
});

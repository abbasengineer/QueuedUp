const functions = require('firebase-functions');
const { admin } = require('firebase-admin');
//const {admin } = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello QueuedUp");
 });

 /*exports.getPosts = functions.https.onRequest((request, response) => {
     admin
     .firestore()
     .collection('posts')
     .get()
     .then((data) => {
            let posts = [];
            data.forEach(doc => {
                posts.push(doc.data());
            })
            return response.json(posts);
        })
        .catch(err => console.log(err));
 });

 exports.createPost = functions.https.onRequest((request, response) => {
   const newPost = {
       body: request.body.body,
       userHandle: request.body.userHandle,
       createdAt: admin.firestore.Timestamp.fromDate(new Date())
   };

   admin.firestore()
   .collection('posts')
   .add(newPost)
   .then(doc => {
       response.json ({message: `document ${doc.id} created successfully`});
   })
   .catch(err =>{
       response.status(500).json({err : 'something went wrong'});
       console.log(err);
   });
});*/
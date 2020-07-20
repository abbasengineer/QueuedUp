const { admin } = require("../util/admin");
const { firebase, firebaseConfig } = require("../util/firebase");

const {
  isSignUpVerified,
  isLogInVerified,
  trimUserInfo,
} = require("../util/verifiers");

exports.signUp = (request, response) => {
  const newUser = {
    fullName: request.body.fullName,
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  };

  const { valid, errors } = isSignUpVerified(newUser);

  if (!valid) {
    return response.status(400).json(errors);
  }

  const defaultImage = "defaultUserImage.png";

  let token;
  let userID;

  admin
    .firestore()
    .doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ username: "Username already taken." });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
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
        imageURL: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${defaultImage}?alt=media`,
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

      if (err.code === "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email already in use" });
      } else if (err.code === "auth/weak-password") {
        return response
          .status(400)
          .json({ password: "Password should be at least 6 characters" });
      } else {
        return response.status(500).json({ info: "Error signing up" });
      }
    });
};

exports.logIn = (request, response) => {
  const existingUser = {
    email: request.body.email,
    password: request.body.password,
  };

  const { valid, errors } = isLogInVerified(existingUser);

  if (!valid) {
    return response.status(400).json(errors);
  }

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
};

// User profile picture upload
exports.imageUpload = (request, response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: request.headers });

  let imageFileName;
  let imageUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    // Only allow image filetypes. TODO: control from html side,
    // see https://www.w3schools.com/tags/att_input_accept.asp
    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
      return response.status(400).json({
        error: "Incorrect filetype submitted. Accepted filetypes: png, jpeg",
      });
    }
    // returns filetype. e.g.: my.image.png returns just .png
    const imageExtension = filename.split(".")[filename.split(".").length - 1];

    // template string for generating a random numeric filename with the above extension
    imageFileName = `${Math.round(
      Math.random() * 10000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageUploaded = { filepath, mimetype };

    // uses filesystem library to create file on local server
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket(firebaseConfig.storageBucket)
      .upload(imageUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageUploaded.mimetype,
          },
        },
      })
      .then(() => {
        // constructs image url to add to user
        const imageURL = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;

        return admin
          .firestore()
          .doc(`/users/${request.user.username}`)
          .update({ imageURL });
      })
      .then(() => {
        return response.json({ message: "Image upload succeeded" });
      })
      .catch((err) => {
        console.error(err);
        return response
          .status(500)
          .json({ error: err.code, message: "Error assigning image" });
      });
  });
  busboy.end(request.rawBody);
};

exports.addUserInfo = (request, response) => {
  let userData = trimUserInfo(request.body);

  admin
    .firestore()
    .doc(`/users/${request.user.username}`)
    .update(userData)
    .then(() => {
      return response.json({ message: "User data added" });
    })
    .catch((err) => {
      console.error(err);

      return response
        .status(500)
        .json({ error: err.code, message: "Error adding user data" });
    });
};

exports.getUserInfo = (request, response) => {
  let userData = {};

  admin
    .firestore()
    .doc(`/users/${request.params.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();

        return admin
          .firestore()
          .collection("posts")
          .where("username", "==", request.params.username)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return response.status(404).json({ error: "User not found" });
      }
    })
    .then((data) => {
      userData.posts = [];

      data.forEach((dataDoc) => {
        userData.posts.push({
          username: dataDoc.data().username,
          content: dataDoc.data().content,
          imageURL: dataDoc.data().imageURL,
          createdAt: dataDoc.data().createdAt,
          postID: dataDoc.id,
        });
      });

      return response.json(userData);
    })
    .catch((err) => {
      console.error(err);

      return response
        .status(500)
        .json({ error: err.code, message: "Error getting user data" });
    });
};

exports.getAuthUser = (request, response) => {
  let userData = {};

  admin
    .firestore()
    .doc(`/users/${request.user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
      }

      return response.json(userData);
    })
    .catch((err) => {
      console.error(err);

      return response.status(500).json({
        error: err.code,
        message: "Error getting authenticated user credentials",
      });
    });
};

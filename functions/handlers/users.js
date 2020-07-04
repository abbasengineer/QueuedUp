const { admin } = require("../util/admin");
const { firebase } = require("../util/firebase");

const { isSignUpVerified, isLogInVerified } = require("../util/verifiers");

exports.signUp = (request, response) => {
  const newUser = {
    fullName: request.body.fullName,
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  };

  const { valid, errors } = isSignUpVerified(newUser);
  if (!valid) return response.status(400).json(errors);

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
};

exports.logIn = (request, response) => {
  const existingUser = {
    email: request.body.email,
    password: request.body.password,
  };

  const { valid, errors } = isLogInVerified(existingUser);
  if (!valid) return response.status(400).json(errors);

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

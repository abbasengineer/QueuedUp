const { admin } = require("../util/admin");

// with Express, provide this authentication middleware to a route
module.exports = (request, response, next) => {
  let IDToken;

  // by convention, "Bearer " (before authorization token in an HTTP request)
  // authenticates the API request, granting access to the bearer
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer ")
  )
    IDToken = request.headers.authorization.split("Bearer ")[1];
  else {
    console.error("Unauthorized: no token found");
    return response.status(403).json({ error: "Unauthorized: no token found" });
  }

  admin
    .auth()
    .verifyIdToken(IDToken)
    .then((decodedToken) => {
      // decodedToken holds the user data inside our token -- add it to our
      // request objects so when the request proceeds forward to some route,
      // our request will have user data
      request.user = decodedToken;
      console.log(decodedToken);

      // limit our result to 1 document
      return admin
        .firestore()
        .collection("users")
        .where("userID", "==", request.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      // extract data from document and attach it to our request
      request.user.username = data.docs[0].data().username;

      return next(); // allow request to proceed
    })
    .catch((err) => {
      console.error("Token verification: ", err);
      return response
        .status(403)
        .json({ error: err.code, message: err.message });
    });
};

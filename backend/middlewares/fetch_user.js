const jwt = require("jsonwebtoken");
const jwt_secret = "StRoNg PaSsWoRd";

// Return user id from jwt token
const fetchUser = (req, res, next) => {
  const authToken = req.headers("auth-token");

  if (!authToken) {
    res.status(401).send({
      error: "Kindly authenticate using a valid token.",
    });
  }

  try {
    const userData = jwt.verify(authToken, jwt_secret);
    req.user = userData.user;

    // run the rest of the functions after this
    next();
  } catch (error) {
    res.status(401).send({
      error: error.message,
    });
  }
};

module.exports = fetchUser;

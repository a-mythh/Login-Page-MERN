const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

// Return user id from jwt token
const fetchUser = (req, res, next) => {
  const authToken = req.header("auth-token");

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

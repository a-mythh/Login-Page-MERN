const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const fetchUser = require("../middlewares/fetch_user");

// Authentication imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

const router = express.Router();

// Endpoint - Sign Up | localhost:3000/auth/signup | POST '/auth'
router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password length is too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if user is able to sign up
    let success = false;

    // check for errors in the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if user with same email already present
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);

      // add the user in the database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });

      // creating payload
      const userData = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(userData, jwt_secret);

      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error("Error: " + error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

// Endpoint - Login | localhost:3000/auth/login | POST '/auth'
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;

    // check for errors in the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // if user doesn't exists in database then failure
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please login with valid credentials (Invalid Email)",
        });
      }

      // check if password matches
      const comparePassword = await bcrypt.compare(password, user.password);

      // if wrong password
      if (!comparePassword) {
        return res.status(400).json({
          success,
          error: "Please login with valid credentials (Invalid Password)",
        });
      }

      // create payload
      const userPayload = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(userPayload, jwt_secret);
      success = true;

      res.json({ success, authToken });
    } catch (error) {
      console.error("Error: " + error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

// Endpoint - Get User Data | localhost:3000/auth/getuser | POST '/auth' - login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    // get user ID from req which was decoded by middleware fetchUser
    const userID = req.user.id;

    const userDetails = await User.findById(userID).select("-password");
    res.send(userDetails);
  } catch (error) {
    console.error("Error: " + error.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;

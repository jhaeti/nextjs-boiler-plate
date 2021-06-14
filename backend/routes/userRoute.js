const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth } = require("./controllers/authMiddleware");

const User = require("../models/user");

const route = express.Router();

// Register Route
route.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    res.status(400).json("Please enter all fields");
  } else {
    //   Check whether user already exist
    User.findOne({ email }).then((user) => {
      if (user) {
        res.status(400).json("User already exist");
      } else {
        const newUser = new User({ name, email, password });
        //   Hashing password before sending to mongoddb
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            res.json("Server Side Error.Please try again");
          }
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            // Saving user with hash password into DataBase
            newUser.save().then((user) => {
              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET_KEY,
                (err, token) => {
                  const { name, email, id } = user;
                  if (err) throw err;

                  // Saving token in coookies before sending data
                  res
                    .cookie(process.env.AUTH_COOKIE_NAME, token, {
                      httpOnly: true,
                    })
                    .json({ token, user: { name, email, id } });
                }
              );
            });
          });
        });
      }
    });
  }
});

// Login Route
route.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    res.status(400).json("Please enter all fields");
  } else {
    //   Check whether user already exist
    User.findOne({ email }).then((user) => {
      if (!user) {
        res.status(400).json("User doesnot exist");
      } else {
        //   Compare plain text Password to Hash Password
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            jwt.sign(
              { id: user.id },
              process.env.JWT_SECRET_KEY,
              (err, token) => {
                const { name, email, id } = user;
                if (err) throw err;

                // Saving token in coookies before sending data
                res
                  .cookie(process.env.AUTH_COOKIE_NAME, token, {
                    httpOnly: true,
                  })
                  .json({ token, user: { name, email, id } });
              }
            );
          } else {
            res.status(400).json("Invalid credentials");
          }
        });
      }
    });
  }
});

// Handling Logout functionality
route.get("/logout", auth, (req, res) => {
  // Clear cookies from the browser
  res.clearCookie(process.env.AUTH_COOKIE_NAME);
  res.sendStatus(200);
});

module.exports = route;

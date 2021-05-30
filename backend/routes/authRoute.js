const express = require("express");

const { auth } = require("./controllers/authMiddleware");

const User = require("../models/user");

const route = express.Router();

route.get("/", auth, (req, res) => {
  User.findById({ _id: req.user.id })
    .select("-password")
    .then((user) => {
      const { token } = req;
      res.json({ token, user });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = route;

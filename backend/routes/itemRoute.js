const express = require("express");

const Item = require("../models/Item");
const { auth } = require("./controllers/authMiddleware");

const route = express.Router();

// Gets all Items and spit in json all the items
route.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// Post an item to api/items
route.post("/", auth, (req, res) => {
  const { name } = req.body;
  const newUser = new Item({ name });
  newUser
    .save()
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

// Deleting an Item
route.delete("/:id", auth, (req, res) => {
  const { id } = req.params;
  Item.findById({ _id: id })

    .then((item) => {
      item.remove().then(() => res.json({ success: true }));
    })
    .catch(() => res.json({ success: false }));
});

module.exports = route;

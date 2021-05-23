const express = require("express");
const Item = require("../models/Item");

const route = express.Router();

// Get all items from database
route.get("/", (req, res) => {
  Item.find().then((items) => res.json(items));
});

// Post an item to api/items
route.post("/", (req, res) => {
  const { name } = req.body;
  const newUser = new Item({ name });
  newUser
    .save()
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

// Deleting an Item
route.delete("/:id", (req, res) => {
  const { id } = req.params;
  Item.findById({ _id: id })
    .then((item) => {
      item.remove().then(() => res.json({ success: true }));
    })
    .catch(() => res.json({ success: false }));
});

module.exports = route;

const express = require("express");

const Item = require("../models/item");
const auth = require("./middleware/auth");

const router = express.Router();

// Gets all Items and spit in json all the items
router.get("/api/items", auth, async (req, res) => {
    try {
        await req.user.populate("items").execPopulate();
        const items = req.user.items;
        res.json(items);
    } catch (e) {
        console.log(e);
    }
});

// Post an item to api/items
router.post("/api/items", auth, async (req, res) => {
    const { name } = req.body;
    const newUser = new Item({ name, owner: req.user._id });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (e) {
        res.sendStatus(500);
    }
});

// Deleting an Item
router.delete("/api/items/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findOneAndDelete({
            _id: id,
            owner: req.user.id,
        });

        if (item === null) {
            return res.sendStatus(401);
        }

        res.json(`${item.name} is deleted successfully`);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;

const express = require("express");

const Item = require("../models/item");
const auth = require("./middleware/auth");

const router = express.Router();

// Gets all Items and spit in json all the items
router.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find().sort({ date: -1 });
        res.json(items);
    } catch (e) {
        console.log(e);
    }
});

// Post an item to api/items
router.post("/api/items", auth, async (req, res) => {
    const { name } = req.body;
    const newUser = new Item({ name });

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
        const item = await Item.findById({ _id: id });
        await item.remove();
        res.json({ success: true });
    } catch (e) {
        res.json({ success: false });
    }
});

module.exports = router;

const express = require("express");

const Item = require("../models/item");
const { auth } = require("./controllers/authMiddleware");

const router = express.Router();

// Gets all Items and spit in json all the items
router.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items).sort({ date: -1 });
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
        res.json(user);
    } catch (e) {
        console.log(e);
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

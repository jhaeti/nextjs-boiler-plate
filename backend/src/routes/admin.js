const express = require("express");

const User = require("../models/user");
const Item = require("../models/item");

const auth = require("./middleware/auth");
const adminAuth = require("./middleware/adminAuth");

const router = express.Router();

router.get("/admin/users", auth, adminAuth, async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get("/admin/items", auth, adminAuth, async (req, res) => {
    try {
        const items = await Item.find();
        res.send(items);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete("/admin/items/:id", auth, adminAuth, async (req, res) => {
    try {
        const id = req.params;
        const item = Item.findByIdAndDelete(id);
        res.status(200).json(item);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete("/admin/users/:id", auth, adminAuth, async (req, res) => {
    try {
        const id = req.params;
        const user = User.findByIdAndDelete(id);
        res.status(101).json(user);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;

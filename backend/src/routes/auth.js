const express = require("express");

const auth = require("./middleware/auth");

const router = express.Router();

// Authorizing Users to ensure not loggin in always once not logged out
router.get("/api/auth", auth, (req, res) => {
    const { token, user } = req;
    res.json({ token, user });
});

module.exports = router;

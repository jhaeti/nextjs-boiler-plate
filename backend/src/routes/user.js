const express = require("express");
const auth = require("./middleware/auth");
const { setCookie, clearCookie } = require("../controllers/cookies");

const User = require("../models/user");

const router = express.Router();

// Register Route
router.post("/users/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json("Please enter all fields");
    }

    try {
        //   Check whether user already exist
        const previousUser = await User.findOne({ email });
        if (previousUser) {
            return res.status(400).json("User already exist");
        }

        // Create new User if user does not exist
        const newUser = new User({ name, email, password, token: [] });

        // Saving user with hash password into DataBase
        const user = await newUser.save();
        const token = await user.generateAuthToken();

        setCookie(res, process.env.AUTH_COOKIE_NAME, token);
        res.status(201).json({
            token,
            user,
        });
    } catch (e) {
        res.status(500).send();
    }
});

// Login Route
router.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by credentials
        const user = await User.findByCredentials(email, password);

        // Generate token for that user
        const token = await user.generateAuthToken();
        setCookie(res, process.env.AUTH_COOKIE_NAME, token);

        res.json({ token, user });
    } catch (e) {
        res.status(400).json(e.message);
    }
});

// Getting user just from having correct cookies set
router.get("/users/me", auth, (req, res) => {
    const { token, user } = req;
    res.json({ token, user });
});

// Delete self from the databse
router.delete("/users/me", auth, async (req, res) => {
    const user = await req.user.remove();
    clearCookie(res, process.env.AUTH_COOKIE_NAME);
    res.json({ user });
});

// Handling Logout functionality
router.get("/users/logout", auth, async (req, res) => {
    const user = req.user;
    await user.removeToken(req.token);
    // Clear cookies from the browser
    clearCookie(res, process.env.AUTH_COOKIE_NAME);
    res.sendStatus(200);
});

module.exports = router;

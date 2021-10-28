const express = require("express");
const auth = require("./middleware/auth");
const { setCookie, clearCookie } = require("../controllers/cookies");

const User = require("../models/user");

const router = express.Router();

// Register Route
router.post("/api/users/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json("Please enter all fields");
    }

    try {
        //   Check whether user already exist
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json("User already exist");
        }

        // Create new User if user does not exist
        const newUser = new User({ name, email, password, token: [] });

        // Saving user with hash password into DataBase
        const registeredUser = await newUser.save();
        const token = await registeredUser.generateAuthToken();
        const { id } = registeredUser;
        // jwt.sign(
        //     { id: registeredUser.id },
        //     process.env.JWT_SECRET_KEY,
        //     (err, token) => {
        //         const { name, email, id } = registeredUser;
        //         if (err) throw err;

        //         // Saving token in coookies before sending data
        setCookie(res, process.env.AUTH_COOKIE_NAME, token);
        res.status(201).json({
            token,
            user: { name, email, id },
        });
        //     }
        // );
    } catch (e) {
        // res.status(500).send();
        console.log(e);
    }
});

// Login Route
router.post("/api/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by credentials
        const user = await User.findByCredentials(email, password);

        // Generate token for that user
        const token = await user.generateAuthToken();
        setCookie(res, process.env.AUTH_COOKIE_NAME, token);

        res.json(user);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

// Handling Logout functionality
router.get("/api/users/logout", auth, async (req, res) => {
    const user = req.user;
    await user.removeToken(req.token);
    // Clear cookies from the browser
    clearCookie(res, process.env.AUTH_COOKIE_NAME);
    res.sendStatus(200);
});

module.exports = router;

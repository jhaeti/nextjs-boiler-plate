const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth } = require("./controllers/authMiddleware");

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
        const newUser = new User({ name, email, password });

        // Saving user with hash password into DataBase
        const registeredUser = await newUser.save();
        jwt.sign(
            { id: registeredUser.id },
            process.env.JWT_SECRET_KEY,
            (err, token) => {
                const { name, email, id } = registeredUser;
                if (err) throw err;

                // Saving token in coookies before sending data
                res.cookie(process.env.AUTH_COOKIE_NAME, token, {
                    httpOnly: true,
                }).json({
                    token,
                    user: { name, email, id },
                });
            }
        );
    } catch (e) {
        res.status(500).send();
    }
});

// Login Route
router.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json("Please enter all fields");
    }

    try {
        //   Check whether user already exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json("User doesnot exist");
        }
        //   Compare plain text Password to Hash Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Invalid credentials");
        }

        jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, (err, token) => {
            const { name, email, id } = user;
            if (err) throw err;

            // Saving token in coookies before sending data
            res.cookie(process.env.AUTH_COOKIE_NAME, token, {
                httpOnly: true,
            }).json({ token, user: { name, email, id } });
        });
    } catch (e) {
        res.send(500);
    }
});

// Handling Logout functionality
router.get("/api/users/logout", auth, (req, res) => {
    // Clear cookies from the browser and Server
    res.clearCookie(process.env.AUTH_COOKIE_NAME).sendStatus(200);
});

module.exports = router;

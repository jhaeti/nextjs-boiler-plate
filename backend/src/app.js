const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();
require("./db/mongoose");

const adminRouter = require("./routes/admin");
const itemRouter = require("./routes/item");
const userRouter = require("./routes/user");

const app = express();

// Add middleware
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.CLIENT_URL, "http://localhost:3000"],
        credentials: true,
    })
);
app.use(express.json({ extended: false }));

// Using routers
app.use(adminRouter);
app.use(itemRouter);
app.use(userRouter);

module.exports = app;

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();
require("./db/mongoose");
// require("./app");

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
app.use(itemRouter);
app.use(userRouter);

const port = process.env.PORT;

app.listen(port, console.log(`Server started on port ${port}`));

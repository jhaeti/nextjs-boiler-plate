const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var cors = require("cors");
require("dotenv").config();

const app = express();

// Add middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json({ extended: false }));

// Connect To route below
app.use("/api/items", require("./routes/itemRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/auth", require("./routes/authRoute"));

// Getting mongo uri from the keys folder
const url =
  process.env.NODE_ENV === "production"
    ? process.env.DOCKER_MONGO_URI
    : process.env.MONGO_DEV_URI;
console.log(url);
// Connect to mongodb using mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("MongoDb connected...")
);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on port ${port}`));

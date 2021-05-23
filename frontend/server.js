const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
require("dotenv").config();

// Bringing in api routes
const itemRoutes = require("./server/routes/Item");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Getting mongo uri from the .env
const url =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : process.env.MONGO_DEV_URI;

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
app.prepare().then(() => {
  const server = express();

  // Add middleware
  server.use(express.json({ extended: false }));

  // Using routes
  server.use("/api/items", itemRoutes);

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

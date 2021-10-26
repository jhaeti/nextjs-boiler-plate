const mongoose = require("mongoose");

// Getting mongo uri base on environment
const uri =
    process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : process.env.MONGO_DEV_URI;

// Connect to mongodb using mongoose
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set("useCreateIndex", true);
mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log("MongoDb connected...")
);

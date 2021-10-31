const mongoose = require("mongoose");

// Getting mongo uri base on environment
const uri =
    process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : process.env.NODE_ENV === "test"
        ? process.env.MONGO_TEST_URI
        : process.env.MONGO_DEV_URI;

// Connect to mongoDB
mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    () => console.log("MongoDb connected...")
);

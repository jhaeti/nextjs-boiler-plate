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

const {
    DEFAULT_ADMIN_NAME: name,
    DEFAULT_ADMIN_EMAIL: email,
    DEFAULT_ADMIN_PASSWORD: password,
} = process.env;

const User = require("../models/user");
const defaultAdminUser = new User({ name, email, password, role: "ADMIN" });
User.findOne({ email })
    .then((user) => {
        if (user === null) {
            return User.find();
        }
    })
    .then(async (users) => {
        if (users && users.length === 0) {
            await defaultAdminUser.save();
        }
    })
    .catch((e) => console.log(e));

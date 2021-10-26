const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Creating User Model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

module.exports = User = mongoose.model("User", userSchema);

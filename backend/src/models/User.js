const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Creating User Model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
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
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    role: {
        type: String,
        default: "BASIC",
        required: true,
    },
});

userSchema.virtual("items", {
    ref: "Item",
    localField: "_id",
    foreignField: "owner",
});

userSchema.methods.toJSON = function () {
    const user = this;

    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
    user.tokens = [...user.tokens, { token }];
    await user.save();
    return token;
};

userSchema.methods.removeToken = async function (token) {
    const user = this;
    user.tokens = user.tokens.filter(
        (tokenObject) => tokenObject.token !== token
    );
    await user.save();
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User does not exist");
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // Send user if there is no errors
    return user;
};

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

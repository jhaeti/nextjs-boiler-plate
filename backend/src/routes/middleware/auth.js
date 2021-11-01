const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { getTokenFromCookie } = require("../../controllers/cookies");

const auth = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = await getTokenFromCookie(
            req,
            process.env.AUTH_COOKIE_NAME
        );

        // Verify the token if it exist
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Find user with decoded token if token is verified
        const user = await User.findOne({
            _id: decoded.id,
            "tokens.token": token,
        }).select("-password");

        // Check to see if user exist
        if (!user) {
            throw new Error("User does not exist");
        }
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).json(e.message);
    }
};

module.exports = auth;

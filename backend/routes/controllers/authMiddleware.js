const jwt = require("jsonwebtoken");

module.exports = {
  // Middleware for Authorizing old users
  auth: (req, res, next) => {
    // get token from cookies
    const token = req.cookies[process.env.AUTH_COOKIE_NAME];

    // Return 401 statusCode if there is no token in cookies
    if (!token) {
      res.status(401).json("No token, Authorization denied");
    } else {
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        req.token = token;
        next();
      } catch (e) {
        res.status(400).json("Token is not valid");
      }
    }
  },
};

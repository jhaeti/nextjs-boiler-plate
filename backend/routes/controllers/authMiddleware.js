const jwt = require("jsonwebtoken");
// module.exports = (req, res, next) => {
//   // const token = req.header("x-auth-token");
//   const token = req.cookies[process.env.AUTH_COOKIE_NAME];

//   if (!token) {
//     res.status(401).json("No token, Authorization denied");
//   } else {
//     try {
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//       req.user = decoded;
//       req.token = token;
//       next();
//     } catch (e) {
//       res.status(400).json("Token is not valid");
//     }
//   }
// };

module.exports = {
  // Middleware for Authorizing old users
  auth: (req, res, next) => {
    // get token from cookies
    const token = req.cookies[process.env.AUTH_COOKIE_NAME];

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

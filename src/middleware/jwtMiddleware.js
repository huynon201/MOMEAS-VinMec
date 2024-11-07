const { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// Xác thực JWT
const authenticateJWT = jwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
}).unless({
  path: ["/login", "/login-endpoint"], // Các route không cần xác thực JWT
});

// Middleware kiểm tra quyền admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next(); // Tiếp tục nếu là admin
  }
  return res.status(403).json({ message: "Forbidden. Admin only." });
};

// Middleware kiểm tra quyền user
const authorizeUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    return next(); // Tiếp tục nếu là user
  }
  return res.status(403).json({ message: "Forbidden. User only." });
};

module.exports = { authenticateJWT, authorizeAdmin, authorizeUser };

const expresJwt = require("express-jwt");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const authenticateJWT = expresJwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
});

module.exports = authenticateJWT;

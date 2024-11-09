require("dotenv").config();
const { findUserByUserName, createUser } = require("../services/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUserName(username);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { name: user.name, role: user.role_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });

      if (user.role_id === 1) {
        res.redirect("/admin");
      } else if (user.role_id === 2) {
        res.redirect("/user");
      }
    } else {
      res.redirect("/login?error=wrongpassword");
    }
  } else {
    res.redirect("/login?error=usernotfound");
  }
};
const getLoginPage = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.clearCookie("token");

  return res.render("login.ejs", { query: req.query });
};

module.exports = {
  login,
  getLoginPage,
};

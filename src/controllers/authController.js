require("dotenv").config();
const { findUserByUserName } = require("../services/userModel");
const { getUserAvatar } = require("../services/CRUDEmployee");
// const { updatePassword } = require("./updatepassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUserName(username);

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        { name: user.name_account, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      const userid = user.name_employee;
      const imguser = await getUserAvatar(userid);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7200000,
      });
      res.cookie("img", imguser);

      if (user.role == "admin") {
        res.redirect("/admin");
      } else if (user.role == "user") {
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
  res.cookie("img", "");
  res.clearCookie("token");
  res.clearCookie("img");
  res.locals.avatar = "default.jpg";

  return res.render("login.ejs", { query: req.query });
};

module.exports = {
  login,
  getLoginPage,
};

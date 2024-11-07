const { findUserByUserName, createUser } = require("../services/userModel");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUserName(username);

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.redirect("/");
    } else {
      res.redirect("/login?error=wrongpassword");
    }
  } else {
    res.redirect("/login?error=usernotfound");
  }
};
const getLoginPage = async (req, res) => {
  return res.render("login.ejs", { query: req.query });
};

module.exports = {
  login,
  getLoginPage,
};

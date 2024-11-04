const connection = require("../configs/database");
const getHomePage = (req, res) => {
  res.render("home.ejs");
};
module.exports = {
  getHomePage,
};

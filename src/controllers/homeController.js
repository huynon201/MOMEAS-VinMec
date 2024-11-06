const connection = require("../configs/database");
const {
  displayCategorary,
  createCatrgory,
  checkUniqueId,
  deleteCategorary,
} = require("../services/CRUDService");
const { generateRandomId } = require("../untils/randomUntils");
const getHomePage = async (req, res) => {
  return res.render("home.ejs", { activePage: "home" });
};
const getCategoraryPage = async (req, res) => {
  let categorary = await displayCategorary();
  return res.render("categorary.ejs", {
    activePage: "category",
    listcategori: categorary,
  });
};
const postCategorary = async (req, res) => {
  let id;
  let isUnique = false;
  while (!isUnique) {
    id = generateRandomId();
    isUnique = await checkUniqueId(id);
  }
  const { name, des } = req.body;
  await createCatrgory(id, name, des);
  res.redirect("/categorary");
};
const postDeleteCategorary = async (req, res) => {
  // const id = await displayCategorary();
  const id = req.body.id;
  console.log(id);
  await deleteCategorary(id);
  res.redirect("/categorary");
};
const getLoginPage = async (req, res) => {
  return res.render("login.ejs");
};
const postloginEndpoint = async (req, res) => {};
module.exports = {
  getHomePage,
  getCategoraryPage,
  postCategorary,
  postDeleteCategorary,
  getLoginPage,
  postloginEndpoint,
};

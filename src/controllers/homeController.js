const {
  displayCategorary,
  createCatrgory,
  checkUniqueId,
  deleteCategorary,
  checkCategoryUsedInProduct,
} = require("../services/CRUDService");
const { generateRandomId } = require("../untils/randomUntils");

const getHomePage = async (req, res) => {
  return res.render("home.ejs", { activePage: "home" });
};
const getHomePagee = async (req, res) => {
  res.send("home");
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
  res.redirect("/admin/categorary");
};
const postDeleteCategorary = async (req, res) => {
  const id = req.body.id;
  await deleteCategorary(id);
  res.redirect("/admin/categorary");
  response.send(error);
};

module.exports = {
  getHomePage,
  getCategoraryPage,
  postCategorary,
  postDeleteCategorary,
  getHomePagee,
};

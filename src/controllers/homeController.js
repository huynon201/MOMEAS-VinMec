const connection = require("../configs/database");
const {
  displayCategorary,
  createCatrgory,
  checkUniqueId,
} = require("../services/CRUDService");
const { generateRandomId } = require("../untils/randomUntils");
const getHomePage = async (req, res) => {
  return res.render("home.ejs", { activePage: "home" });
};
const getCategoraryPage = async (req, res) => {
  let categorary = await displayCategorary();
  res.render("categorary.ejs", {
    activePage: "category",
    listcategori: categorary,
  });
};
const postCategorary = async (req, res) => {
  let isUnique = false;
  while (!isUnique) {
    const id = generateRandomId();
    isUnique = await checkUniqueId(id);
  }
  const { name, des } = req.body;
  await createCatrgory(id, name, des);
  res.redirect("/categorary");
};
module.exports = {
  getHomePage,
  getCategoraryPage,
  postCategorary,
};

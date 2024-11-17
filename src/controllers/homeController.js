const { generateRandomId } = require("../untils/randomUntils");
const {
  displayCategorary,
  createCatrgory,
  checkUniqueId,
  deleteCategorary,
  checkCategoryUsedInProduct,
} = require("../services/CRUDService");
const { displayProduct } = require("../services/CRUDProduct");
const getHomePage = async (req, res) => {
  let product = await displayProduct();
  return res.render("home.ejs", { activePage: "home", listProduct: product });
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
  const create_at = new Date();
  console.log(create_at);
  await createCatrgory(id, name, des, create_at);
  res.redirect("/admin/categorary");
};
const postDeleteCategorary = async (req, res) => {
  const id = req.body.id;
  await deleteCategorary(id);
  res.redirect("/admin/categorary");
};

module.exports = {
  getHomePage,
  getCategoraryPage,
  postCategorary,
  postDeleteCategorary,
};

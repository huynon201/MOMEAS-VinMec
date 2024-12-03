const { generateRandomId } = require("../untils/randomUntils");
const { formatDate } = require("../untils/timeZone");
const {
  displayCategorary,
  createCatrgory,
  checkUniqueId,
  deleteCategorary,
  checkCategoryUsedInProduct,
  updateCategory,
} = require("../services/CRUDService");
const { displayProduct } = require("../services/CRUDProduct");
var moment = require("moment");

const getHomePage = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
  const limit = 8; // Số phần tử mỗi trang

  let { products, totalItems } = await displayProduct(page, limit);
  const totalPages = Math.ceil(totalItems / limit);
  return res.render("home.ejs", {
    activePage: "home",
    listProduct: products,
    currentPage: page,
    totalPages,
  });
};

const getCategoraryPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
  const limit = 10; // Số phần tử mỗi trang

  // Gọi service để lấy dữ liệu
  const { categories, totalItems } = await displayCategorary(page, limit);

  const totalPages = Math.ceil(totalItems / limit); // Tính tổng số trang

  // Render ra view
  return res.render("categorary.ejs", {
    activePage: "category",
    listcategori: categories,
    currentPage: page,
    totalPages,
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

  const at = new Date();
  const create_at = moment(at).format("YYYY-MM-DD HH:mm:ss");
  await createCatrgory(id, name, des, create_at);
  res.redirect("back");
};
const postDeleteCategorary = async (req, res) => {
  const id = req.body.id;
  await deleteCategorary(id);
  res.redirect("back");
};
const postUpdateCategory = async (req, res) => {
  const { editUserId, name, des } = req.body;
  await updateCategory(editUserId, name, des);
  res.redirect("back");
};
module.exports = {
  getHomePage,
  getCategoraryPage,
  postCategorary,
  postDeleteCategorary,
  postUpdateCategory,
};

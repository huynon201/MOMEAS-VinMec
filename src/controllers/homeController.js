const { generateRandomId } = require("../untils/randomUntils");
const {
  displayCategorary,
  createCatrgory,
  checkUniqueId,
  deleteCategorary,
  checkCategoryUsedInProduct,
  updateCategory,
} = require("../services/CRUDService");
const { displayProduct } = require("../services/CRUDProduct");
const getHomePage = async (req, res) => {
  let product = await displayProduct();
  return res.render("home.ejs", { activePage: "home", listProduct: product });
};

// const getCategoraryPage = async (req, res) => {
//   let categorary = await displayCategorary();
//   return res.render("categorary.ejs", {
//     activePage: "category",
//     listcategori: categorary,
//   });
// };
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
  const create_at = new Date();
  console.log(create_at);
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

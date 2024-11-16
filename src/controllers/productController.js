var multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, "./src/public/assets/content/upload");
  },
  filename: (req, file, res) => {
    res(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const {
  createProducts,
  displayProduct,
  displayCategory,
} = require("../services/CRUDProduct");

const getProductPage = async (req, res) => {
  let product = await displayProduct();
  let img = await displayProduct();
  let category = await displayCategory();
  return res.render("product.ejs", {
    activePage: "product",
    listProduct: product,
    lastImg: img,
    listCategories: category,
  });
};
const postCreateProduct = async (req, res) => {
  const image = req.files.image[0].filename;

  const { name, des, quantity, brand, color, size, category } = req.body;
  const parsedQuantity = parseInt(quantity);
  await createProducts(
    name,
    des,
    parsedQuantity,
    brand,
    color,
    size,
    category,
    image
  );
  res.redirect("/admin/product");
};
module.exports = {
  getProductPage,
  postCreateProduct,
  upload,
};

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
  deleteProduct,
  updateProduct,
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
  res.redirect("back");
};
const postDeleteProduct = async (req, res) => {
  const id = req.body.id;
  await deleteProduct(id);
  res.redirect("back");
};
const postUpdateProduct = async (req, res) => {
  const image = req.files.image[0].filename;
  const { editProductId, name, des, brand, size, category, color, quantity } =
    req.body;
  console.log(req.body.quantity);
  await updateProduct(
    editProductId,
    name,
    des,
    brand,
    size,
    category,
    color,
    image,
    quantity
  );
  res.redirect("back");
};
module.exports = {
  getProductPage,
  postCreateProduct,
  upload,
  postDeleteProduct,
  postUpdateProduct,
};

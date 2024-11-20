const express = require("express");
const router = express.Router();
const adminRouter = express.Router();
const userRouter = express.Router();
// homecontroller
const {
  getHomePage,
  getCategoraryPage,
  postCategorary,
  postDeleteCategorary,
  postUpdateCategory,
} = require("../controllers/homeController");
// productcontroller
const {
  getProductPage,
  postCreateProduct,
  upload,
  postDeleteProduct,
} = require("../controllers/productController");
const { login, getLoginPage } = require("../controllers/authController");

adminRouter.get("/", getHomePage);

adminRouter.get("/categorary", getCategoraryPage);
adminRouter.post("/create-category", postCategorary);
adminRouter.post("/delete-category", postDeleteCategorary);
adminRouter.post("/update-category", postUpdateCategory);

adminRouter.get("/product", getProductPage);
adminRouter.post("/delete-product", postDeleteProduct);
adminRouter.post(
  "/create-product",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "quantity", maxCount: 1 },
  ]),
  postCreateProduct
);

router.get("/", getLoginPage);
router.post("/login-endpoint", login);
module.exports = {
  router,
  adminRouter,
  userRouter,
};

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
  postUpdateProduct,
} = require("../controllers/productController");

const { login, getLoginPage } = require("../controllers/authController");
// deparmentcontroller
const {
  getDepartmentPage,
  postCreateDepartment,
  postDeleteDepartment,
  postUpdateDepartment,
} = require("../controllers/departmentController");

// employeeController
const {
  getemployeePage,
  postCreateEmployee,
  postDeleteEmployee,
  postUpdateEmployee,
} = require("../controllers/employeeController");
// accountController
const {
  getAccountPage,
  postCreateAccount,
  postDeleteAccount,
  postUpdateAccount,
} = require("../controllers/accountController");

// exportController
const {
  getExportPage,
  postCreateExport,
} = require("../controllers/exportController");

adminRouter.get("/", getHomePage);

adminRouter.get("/categorary", getCategoraryPage);
adminRouter.post("/create-category", postCategorary);
adminRouter.post("/delete-category", postDeleteCategorary);
adminRouter.post("/update-category", postUpdateCategory);

adminRouter.get("/product", getProductPage);
adminRouter.post("/delete-product", postDeleteProduct);
adminRouter.post(
  "/update-product",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "quantity", maxCount: 1 },
  ]),
  postUpdateProduct
);

adminRouter.post(
  "/create-product",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "quantity", maxCount: 1 },
  ]),
  postCreateProduct
);

adminRouter.get("/departments", getDepartmentPage);
adminRouter.post("/create-department", postCreateDepartment);
adminRouter.post("/delete-department", postDeleteDepartment);
adminRouter.post("/update-department", postUpdateDepartment);

adminRouter.get("/employee", getemployeePage);
adminRouter.post("/create-employee", postCreateEmployee);
adminRouter.post("/delete-employee", postDeleteEmployee);
adminRouter.post("/update-employee", postUpdateEmployee);

adminRouter.get("/account", getAccountPage);
adminRouter.post("/create-account", postCreateAccount);
adminRouter.post("/delete-account", postDeleteAccount);
adminRouter.post("/update-account", postUpdateAccount);

adminRouter.get("/export", getExportPage);
const { displayProduct } = require("../services/CRUDProduct");
adminRouter.get("/api/products", async (req, res) => {
  let product = await displayProduct();
  res.json(product);
});

adminRouter.post("/create-export", postCreateExport);

router.get("/", getLoginPage);
router.post("/login-endpoint", login);
module.exports = {
  router,
  adminRouter,
  userRouter,
};

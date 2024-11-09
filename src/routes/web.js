const express = require("express");
const router = express.Router();
const adminRouter = express.Router();
const userRouter = express.Router();

const {
  getHomePage,
  getHomePagee,
  getCategoraryPage,
  postCategorary,
  postDeleteCategorary,
} = require("../controllers/homeController");
const { login, getLoginPage } = require("../controllers/authController");

adminRouter.get("/", getHomePage);
adminRouter.get("/categorary", getCategoraryPage);
adminRouter.post("/create-category", postCategorary);
adminRouter.post("/delete-category", postDeleteCategorary);
userRouter.get("/", getHomePagee);
router.get("/", getLoginPage);
router.post("/login-endpoint", login);
module.exports = {
  router,
  adminRouter,
  userRouter,
};

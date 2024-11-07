const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  authorizeAdmin,
  authorizeUser,
} = require("../middleware/jwtMiddleware");
const {
  getHomePage,
  getCategoraryPage,
  postCategorary,
  postDeleteCategorary,
} = require("../controllers/homeController");
const { login, getLoginPage } = require("../controllers/authController");

router.use(authenticateJWT);

router.use("/admin", authorizeAdmin);
router.get("/admin", getHomePage);
router.get("/admin/categorary", getCategoraryPage);
router.post("/admin/create-category", postCategorary);
router.post("/admin/delete-category", postDeleteCategorary);
// router.get("/", getHomePage);
// router.get("/categorary", getCategoraryPage);
// router.post("/create-category", postCategorary);
// router.post("/delete-category", postDeleteCategorary);
router.get("/login", getLoginPage);
router.post("/login-endpoint", login);
module.exports = router;

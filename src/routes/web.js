const express = require("express");
const router = express.Router();
const {
  getHomePage,
  getCategoraryPage,
  postCategorary,
  postDeleteCategorary,
  getLoginPage,
  postloginEndpoint,
} = require("../controllers/homeController");
router.get("/", getHomePage);
router.get("/categorary", getCategoraryPage);
router.post("/create-category", postCategorary);
router.post("/delete-category", postDeleteCategorary);
router.get("/login", getLoginPage);
router.post("/login-endpoint", postloginEndpoint);
module.exports = router;

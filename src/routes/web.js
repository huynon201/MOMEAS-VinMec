const express = require("express");
const router = express.Router();
const {
  getHomePage,
  getCategoraryPage,
  postCategorary,
  postDeleteCategorary,
} = require("../controllers/homeController");
router.get("/", getHomePage);
router.get("/categorary", getCategoraryPage);
router.post("/create-category", postCategorary);
router.post("/delete-category", postDeleteCategorary);

module.exports = router;

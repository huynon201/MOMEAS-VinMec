const express = require("express");
const router = express.Router();
const {
  getHomePage,
  getCategoraryPage,
  postCategorary,
} = require("../controllers/homeController");
router.get("/", getHomePage);
router.get("/categorary", getCategoraryPage);
router.post("/create-category", postCategorary);
module.exports = router;

const express = require("express");

const { addCategoryPage, viewCategoryPage, addCategory } = require("../controllers/category.controller");

const categoryRoute = express.Router();

//Category multer
const upload = require("../middleware/category.multer.middleware");

//view Product
categoryRoute.get("/viewCategoryPage" , viewCategoryPage)

//Add Product
categoryRoute.get("/addCategoryPage" , addCategoryPage)
categoryRoute.post("/addCategory",upload.single("category_image"),addCategory)


module.exports = categoryRoute;
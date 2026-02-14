const express = require("express");

const { addCategoryPage, viewCategoryPage, addCategory, deleteCategory, editCategory, updateCategory } = require("../controllers/category.controller");

const categoryRoute = express.Router();

//Category multer
const upload = require("../middleware/category.multer.middleware");

//view Product
categoryRoute.get("/viewCategoryPage" , viewCategoryPage);

//Add Product
categoryRoute.get("/addCategoryPage" , addCategoryPage)
categoryRoute.post("/addCategory",upload.single("category_image"),addCategory);

//Delete Category
categoryRoute.get("/deleteCategory/:categoryId", deleteCategory);

//Edit Category
categoryRoute.get("/editCategory/:categoryId" , editCategory )
categoryRoute.post('/updateCategory/:categoryId',  upload.single('category_image'), updateCategory);

module.exports = categoryRoute;
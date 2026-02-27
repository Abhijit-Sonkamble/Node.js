const express = require("express");
const { addSubCategoryPage, addSubCategory, viewSubCategoryPage } = require("../controllers/subCategory.controller");
const subCategoryRoute = express.Router();


//Add subCategory
subCategoryRoute.get("/addSubCategoryPage", addSubCategoryPage);
subCategoryRoute.post("/addSubCategory" , addSubCategory);

//View SubCategory
subCategoryRoute.get("/viewSubCategoryPage", viewSubCategoryPage)

module.exports = subCategoryRoute;
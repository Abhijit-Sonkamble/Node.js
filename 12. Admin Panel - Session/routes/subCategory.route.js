const express = require("express");
const { addSubCategoryPage, addSubCategory, viewSubCategoryPage, updateSubCategory, editSubCategory, deleteSubcategory } = require("../controllers/subCategory.controller");
const subCategoryRoute = express.Router();


//Add subCategory
subCategoryRoute.get("/addSubCategoryPage", addSubCategoryPage);
subCategoryRoute.post("/addSubCategory" , addSubCategory);

//View SubCategory
subCategoryRoute.get("/viewSubCategoryPage", viewSubCategoryPage);

//SubCategory Update
subCategoryRoute.get("/editSubCategory/:subCategoryId" , editSubCategory )
subCategoryRoute.post('/updateSubCategory/:subCategoryId', updateSubCategory);

//Delete SubCategory
subCategoryRoute.get("/deleteSubCategory/:subCategoryId",deleteSubcategory);

module.exports = subCategoryRoute;
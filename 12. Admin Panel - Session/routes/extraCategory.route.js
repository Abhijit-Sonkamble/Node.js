const express = require("express");
const { addExtraCategoryPage, addExtraCategory, viewExtraCategoryPage, editExtraCategoryPage, updateExtraCategory, deleteExtraCategory } = require("../controllers/extraCategory.controller");

const extraCategoryRoute = express.Router();

//Add Extra Category
extraCategoryRoute.get("/addExtraCategoryPage" , addExtraCategoryPage)
extraCategoryRoute.post("/addExtraCategory", addExtraCategory)

//View Extra Category
extraCategoryRoute.get("/viewExtraCategoryPage" , viewExtraCategoryPage);

//Edit Extra Category
extraCategoryRoute.get("/editExtraCategoryPage/:extraCategoryId", editExtraCategoryPage);
extraCategoryRoute.post('/updateExtraCategory/:extraCategoryId', updateExtraCategory);

//Delete
extraCategoryRoute.get("/deleteExtraCategory/:extraCategoryId", deleteExtraCategory);





module.exports = extraCategoryRoute;
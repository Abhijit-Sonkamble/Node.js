const express = require("express");
const { addExtraCategoryPage, addExtraCategory } = require("../controllers/extraCategory.controller");

const extraCategoryRoute = express.Router();

//Add Extra Category
extraCategoryRoute.get("/addExtraCategoryPage" , addExtraCategoryPage)
extraCategoryRoute.post("/addExtraCategory", addExtraCategory)

module.exports = extraCategoryRoute;
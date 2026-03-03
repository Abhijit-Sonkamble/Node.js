const express = require("express");
const { addProductsPage } = require("../controllers/products.controller");

const productsRoute = express.Router();

productsRoute.get("/addProductsPage", addProductsPage)

module.exports = productsRoute;
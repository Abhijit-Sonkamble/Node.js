const express = require("express");
const { addProductsPage, addProducts, viewProductsPage, editProductsPage, updateProducts, deleteProducts } = require("../controllers/products.controller");
const upload = require ("../middleware/products.multer.middleware");

const productsRoute = express.Router();

//Add Products
productsRoute.get("/addProductsPage", addProductsPage);
productsRoute.post("/addProducts",upload.single("product_image"), addProducts);
productsRoute.get("/editProductsPage/:productId", editProductsPage);
productsRoute.post("/updateProducts/:productId", upload.single("product_image"), updateProducts);
productsRoute.get("/deleteProducts/:productId", deleteProducts);
productsRoute.get("/viewProductsPage" , viewProductsPage);

module.exports = productsRoute;
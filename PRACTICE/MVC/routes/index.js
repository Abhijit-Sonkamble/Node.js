const express = require("express");
const { homePage, aboutPage } = require("../controllers/home.controller");

const route = express.Router();

route.get("/" , homePage);
route.get("/about" , aboutPage)

module.exports = route;
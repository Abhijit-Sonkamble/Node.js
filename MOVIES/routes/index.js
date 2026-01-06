const express = require("express");
const {tablePage, formPage, updatePage, addMovie, updateMovie, deleteMovie,} = require("../controllers/home.controller");

const route = express.Router();

// Render
route.get("/", tablePage);
route.get("/add", formPage);
route.get("/edit", updatePage);

// Form actions
route.post("/addMovie", addMovie);
route.post("/update", updateMovie);
route.get("/delete", deleteMovie);

module.exports = route;

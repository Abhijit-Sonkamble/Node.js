const express = require("express");
const { empPage } = require("../controllers/emp.controller");

const empRoute = express.Router();

//Rout of emp file
route.get("/employee" , empPage);

module.exports = {
    empRoute
};
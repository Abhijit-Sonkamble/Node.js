const express = require ("express");
const { dashboardPage, addAdmin, viewAdmin, insert } = require("../controllers/admin.controller");

const route = express.Router();

//Dashboard
route.get("/" , dashboardPage);

//Add Admin
route.get("/addAdmin" , addAdmin);

//View Page
route.get("/viewAdmin" , viewAdmin)

//Insert Page
route.post("/insert" , insert)

module.exports = route;
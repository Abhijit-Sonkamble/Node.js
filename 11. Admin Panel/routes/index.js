

const express = require ("express");
const { dashboardPage } = require("../controllers/admin.controller");

const route = express.Router();

route.get("/" , dashboardPage)

module.exports = route;
const express = require("express");
const { register } = require("../../controllers/admin.controller");

const adminRoute = express.Router()

adminRoute.post("/register", register)


module.exports = adminRoute;
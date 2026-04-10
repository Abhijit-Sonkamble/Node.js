const express = require("express");

const route = express.Router()

route.use("/admin" , require("./admin/admin.route"))

module.exports = route;
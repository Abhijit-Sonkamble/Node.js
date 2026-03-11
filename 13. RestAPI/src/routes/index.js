const express = require("express");
const route = express.Router();

//Employee he main domain aahe
route.use("/Employee" , require("./emp.route"))


module.exports =route;
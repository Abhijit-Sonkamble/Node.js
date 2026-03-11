const express = require("express");
const { addEmp, fetchEmp, deleteEmp, updateEmp, fetchSingleEmp } = require("../controllers/employee.controller");
const AdminRoute = express.Router();

//Domain bas ek ch asel aani tyane aapn crud operation karu shakto tyala boltat Rest Api jase ki ithe domain aahe employee

AdminRoute.post("/" , addEmp);
AdminRoute.get("/", fetchEmp);

//Delete
AdminRoute.delete("/", deleteEmp);

//Update
AdminRoute.patch("/:id", updateEmp);

//Fetch Single emp
AdminRoute.get("/:id", fetchSingleEmp);

module.exports =AdminRoute;
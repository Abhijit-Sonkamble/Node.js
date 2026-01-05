/* Ya file madhe sagle routes bantil in / kelya vr kontya page vr jayla pahije /name ase kahi
kelya vr kontya page vr he sagle ithe hoil
*/



const express = require("express");
const { homePage} = require("../controllers/home.controller");


//For export router and router is method
const route = express.Router(); //we store route in variable

route.get("/" , homePage);

module.exports = route; //Dusrya file madhe gheun janya sathi use hote
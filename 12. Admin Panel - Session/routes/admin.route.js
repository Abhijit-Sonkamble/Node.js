const express = require("express");
const passport = require("passport");
const { viewAdminPage, addAdminPage , insertAdmin, deleteAdmin,editAdminPage, updateAdmin} = require("../controllers/admin.controller");
const adminRoute = express.Router();

//Attact Middleware Folder
const upload = require('../middleware/multer.middleware');


// Admin
adminRoute.get('/viewAdminPage', viewAdminPage);
adminRoute.get('/addAdminPage',addAdminPage);
adminRoute.post('/insertAdmin',upload.single("profile_image"), insertAdmin);

//Delete 
adminRoute.get('/deleteAdmin/:adminId',deleteAdmin);

// Edit Admin Routes
adminRoute.get('/editAdmin/:adminId', editAdminPage);
adminRoute.post('/updateAdmin/:adminId',  upload.single('profile_image'), updateAdmin);

module.exports = adminRoute;
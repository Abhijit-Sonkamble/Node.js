const express = require('express');
const passport = require("passport");
const route = express.Router();
const { loginPage, checkLogin, logout, forgetPage, verifyEmail, OTPpage, OTPVerify, newPasswordPage, changeNewPassword, dashboardPage,  changePasswordPage, changePassword } = require('../controllers/admin.controller');

//Attact Middleware Folder
const upload = require('../middleware/multer.middleware');

// Login & Logout
route.get('/', passport.checkAuthNotDone,loginPage);
route.post('/login',passport.checkAuthNotDone, passport.authenticate("localAuth"/*change kele tr ithe pn dyave lagel nahitr local cha name rahil */
    ,{
    failureRedirect : "/"
}),checkLogin);
route.get('/logout', logout);

// Forgot Password / OTP Flow
route.get('/forgetPage',passport.checkAuthNotDone, forgetPage);
route.post('/verify-email', passport.checkAuthNotDone,verifyEmail);
route.get('/otp-page', passport.checkAuthNotDone, OTPpage);
route.post('/otpVerify',passport.checkAuthNotDone, OTPVerify);
route.get('/newPasswordPage',passport.checkAuthNotDone, newPasswordPage);
route.post('/change-new-password', passport.checkAuthNotDone, changeNewPassword);

// Dashboard & Profile
route.get('/dashboard',passport.checkAuthDone, dashboardPage);
route.get('/changePasswordPage', passport.checkAuthDone, changePasswordPage);
route.post('/changePassword', passport.checkAuthDone, changePassword);



//Category require
route.use("/category" ,passport.checkAuthDone, require("./category.route"));

//Admin Route Page
route.use("/admin", passport.checkAuthDone, require("./admin.route"));

//Sub category page
route.use("/subCategory", passport.checkAuthDone, require("./subCategory.route"));

module.exports = route;
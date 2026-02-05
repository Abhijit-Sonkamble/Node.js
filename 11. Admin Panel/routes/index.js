const express = require('express');
const route = express.Router();
const { loginPage, checkLogin, logout, forgetPage, verifyEmail, OTPpage, OTPVerify, newPasswordPage, changeNewPassword, dashboardPage, profilePage, changePasswordPage, changePassword, viewAdminPage, addAdminPage, insertAdmin, deleteAdmin, editAdminPage, updateAdmin } = require('../controllers/admin.controller');

//Attact Middleware Folder
const upload = require('../middleware/multer.middleware');

// Login & Logout
route.get('/', loginPage);
route.post('/login', checkLogin);
route.get('/logout', logout);

// Forgot Password / OTP Flow
route.get('/forgetPage', forgetPage);
route.post('/verify-email', verifyEmail);
route.get('/otp-page', OTPpage);
route.post('/otpVerify', OTPVerify);
route.get('/newPasswordPage', newPasswordPage);
route.post('/change-new-password', changeNewPassword);

// Dashboard & Profile
route.get('/dashboard', dashboardPage);
route.get('/profile', profilePage);
route.get('/changePasswordPage', changePasswordPage);
route.post('/changePassword', changePassword);

// Admin
route.get('/viewAdminPage', viewAdminPage);
route.get('/addAdminPage', addAdminPage);
route.post('/insertAdmin', upload.single("profile_image"), insertAdmin);
route.get('/deleteAdmin/:adminId',deleteAdmin);

// Edit Admin Routes
route.get('/editAdmin/:adminId', editAdminPage);
route.post('/updateAdmin/:adminId', upload.single('profile_image'), updateAdmin);

module.exports = route;
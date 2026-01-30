const Admin = require('../model/admin.model');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Login Page
module.exports.loginPage = async (req, res) => {
    try {
        if (req.cookies.adminId) {
            const admin = await Admin.findById(req.cookies.adminId);
            if (admin) return res.redirect('/dashboard');
        }
        return res.render('auth/login');
    } catch (err) {
        console.log("Error in loginPage:", err);
        return res.render('auth/login');
    }
};

// Login Logic
module.exports.checkLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin || admin.password !== req.body.password) {
            console.log("Invalid Email or Password");
            return res.redirect('/');
        }
        res.cookie('adminId', admin._id);
        return res.redirect('/dashboard');
    } catch (err) {
        console.log("Error in checkLogin:", err);
        return res.redirect('/');
    }
};

// Logout
module.exports.logout = (req, res) => {
    res.clearCookie('adminId');
    return res.redirect('/');
};

// --- DASHBOARD & PROFILE ---

// Dashboard
module.exports.dashboardPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');
        return res.render('dashboard', { admin });
    } catch (err) {
        console.log("Error in dashboardPage:", err);
        return res.redirect('/');
    }
};

// Profile Page
module.exports.profilePage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');
        return res.render('profile/profilePage', { admin, singleAdmin: admin });
    } catch (err) {
        console.log("Error in profilePage:", err);
        return res.redirect('/');
    }
};



// View Admins
module.exports.viewAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');

        let allAdmin = await Admin.find();
        
        allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);

        return res.render('admin/viewAdmin', { allAdmin, admin });
    } catch (err) {
        console.log("Error in viewAdminPage:", err);
        return res.redirect('/dashboard');
    }
};

// Add Admin Page
module.exports.addAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');
        return res.render('admin/addAdmin', { admin });
    } catch (err) {
        console.log("Error in addAdminPage:", err);
        return res.redirect('/dashboard');
    }
};

// Insert Admin Logic
module.exports.insertAdmin = async (req, res) => {
    try {
        if (req.file) req.body.profile_image = req.file.path;
        await Admin.create(req.body);
        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Error in insertAdmin:", err);
        return res.redirect('/addAdminPage');
    }
};

// Edit Admin Page
module.exports.editAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');

        const singleAdmin = await Admin.findById(req.params.adminId);
        return res.render('admin/editAdmin', { admin, singleAdmin });
    } catch (err) {
        console.log("Error in editAdminPage:", err);
        return res.redirect('/viewAdminPage');
    }
};

// Update Admin Logic
module.exports.updateAdmin = async (req, res) => {
    try {
        const { adminId } = req.params; // Matches :adminId in the route
        let updateData = { ...req.body };

        if (req.file) {
            // Get the old record to delete the old image
            const oldAdmin = await Admin.findById(adminId);
            
            if (oldAdmin && oldAdmin.profile_image) {
                // Construct the full path to delete
                const oldImagePath = path.join(__dirname, "..", oldAdmin.profile_image); 
                // Note: adjust the path above based on your folder structure
                if (fs.existsSync(oldAdmin.profile_image)) {
                    fs.unlinkSync(oldAdmin.profile_image);
                }
            }
            
            // Save the new image path (using req.file.path or filename)
            updateData.profile_image = req.file.path; 
        }

        await Admin.findByIdAndUpdate(adminId, updateData);
        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.error("Update Error:", err);
        return res.redirect('/viewAdminPage');
    }
};
module.exports.deleteAdmin = async (req, res) => {
    try {
        // Change from .query to .params
        const { adminId } = req.params; 
        
        const deletedUser = await Admin.findByIdAndDelete(adminId);
        
        if (deletedUser && deletedUser.profile_image) {
            // Delete the image file from the server
            fs.unlink(deletedUser.profile_image, (err) => { 
                if(err) console.log("Fs-unlink error:", err); 
            });
        }
        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.error("Delete Error:", err);
        return res.redirect('/viewAdminPage');
    }
};

// --- PASSWORD SETTINGS (LOGGED IN) ---

module.exports.changePasswordPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) return res.redirect('/');
       return res.render('profile/changePassword', { admin });
    } catch (err) {
        return res.redirect('/dashboard');
    }
};

module.exports.changePassword = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        const { current_psw, new_psw, confirm_psw } = req.body;

        if(current_psw === new_psw){
            console.log("Current Password and new password are same..");
            return res.redirect('/changePasswordPage');
        }
        if (current_psw !== admin.password) {
            console.log("Current password does not match");
            return res.redirect('/changePasswordPage'); 
        }

        if (new_psw !== confirm_psw) {
            console.log("New passwords do not match");
            return res.redirect('/changePasswordPage');
        }

        await Admin.findByIdAndUpdate(admin._id, { password: new_psw });
        res.clearCookie('adminId');
        return res.redirect('/'); 
    } catch (err) {
        console.log("Error in changePassword:", err);
        return res.redirect('/dashboard');
    }
};

// --- FORGOT PASSWORD (OTP FLOW) ---

module.exports.forgetPage = (req, res) => res.render('auth/forgetPage');

module.exports.verifyEmail = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.redirect('/verify-email');

        const OTP = Math.floor(100000 + Math.random() * 900000);
        let transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: { user: "thelearner1326@gmail.com", pass: "gszcimhtutgtobnf" } 
        });

        await transporter.sendMail({
            from: 'Admin Panel',
            to: req.body.email,
            subject: "OTP Verification",
            html: `<h3>Your OTP is: ${OTP}</h3>`
        });

        res.cookie("OTP", OTP);
        res.cookie("Id", admin._id);
        return res.redirect('/otp-page');
    } catch (err) {
        console.log("Email verification error:", err);
        return res.redirect('/forgetPage');
    }
};

module.exports.OTPpage = (req, res) => {
    if (!req.cookies.OTP) return res.redirect('/forgetPage');
    res.render('auth/OTPpage');
};

module.exports.OTPVerify = (req, res) => {
    if (req.body.adminOTP == req.cookies.OTP) {
        res.clearCookie('OTP');
        return res.redirect('/newPasswordPage'); 
    }
    return res.redirect('/otp-page');
};
module.exports.newPasswordPage = (req, res) => {
    if (!req.cookies.Id) return res.redirect('/');
    
    res.render('auth/newPassword'); 
};

module.exports.changeNewPassword = async (req, res) => {
    try {
        const { new_password, confirm_password } = req.body;
        if (new_password !== confirm_password) return res.redirect('/newPasswordPage');

        await Admin.findByIdAndUpdate(req.cookies.Id, { password: new_password });
        res.clearCookie('Id');
        res.clearCookie('OTP');
        return res.redirect('/');
    } catch (err) {
        return res.redirect('/');
    }
};
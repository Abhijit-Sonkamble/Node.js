const Admin = require("../model/admin.model");
const fs = require("fs");
const nodemailer = require("nodemailer");

function removeSession(req,res){
   req.session.destroy((err)=>{
    if (!err) {
      return res.redirect("/");
    }
    console.log("controller logout error : " , err);
  })
}

// Login Page
module.exports.loginPage = async (req, res) => {
  try {
    return res.render("auth/login");
  } catch (err) {
    req.flash("error","Unable to load login page");
    console.log("Error in loginPage:", err);
    return res.render("auth/login");
  }
};

// Login Logic
module.exports.checkLogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin || admin.password !== req.body.password) {
      req.flash('error', "Invalid Email or Password");
      return res.redirect("/");
    }

    req.flash('success', "Admin Login Successfully");
    res.cookie("adminId", admin._id);
    return res.redirect("/dashboard");

  } catch (err) {
    req.flash('error', "Admin Login Failed");
    return res.redirect("/");
  }
};

// Logout
module.exports.logout = (req, res) => {
  req.flash("success","Logout Successfully");
  removeSession(req,res);
};


// Dashboard
module.exports.dashboardPage = async (req, res) => {
  try {
    return res.render("dashboard");
  } catch (err) {
    req.flash("error","Unable to open dashboard");
    return res.redirect("/");
  }
};

// Profile Page
module.exports.profilePage = async (req, res) => {
  try {
    const admin = req.user;
    return res.render("profile/profilePage", { admin });
  } catch (err) {
    req.flash("error","Profile load failed");
    return res.redirect("/");
  }
};

// View Admins
module.exports.viewAdminPage = async (req, res) => {
  try {
    let allAdmin = await Admin.find();
    allAdmin = allAdmin.filter((subadmin) => subadmin.email != res.locals.admin.email);
    return res.render("admin/viewAdmin", { allAdmin });
  } catch (err) {
    req.flash("error","Unable to fetch admins");
    return res.redirect("/dashboard");
  }
};

// Add Admin Page
module.exports.addAdminPage = async (req, res) => {
  try {
    return res.render("admin/addAdmin");
  } catch (err) {
    req.flash("error","Page not found");
    return res.redirect("/dashboard");
  }
};

// Insert Admin Logic
module.exports.insertAdmin = async (req, res) => {
  try {

    if(!req.file){
      req.flash("error","Profile image required");
      return res.redirect("/admin/addAdminPage");
    }

    req.body.profile_image = req.file.path;
    const addAdmin = await Admin.create(req.body);

    if(addAdmin){
      req.flash('success', "Admin Added Successfully");
    }else{
      req.flash('error', "Admin Not Added");
    }

    return res.redirect("/admin/addAdminPage");

  } catch (err) {
    req.flash('error', "Something went wrong");
    return res.redirect("/admin/addAdminPage");
  }
};

// Edit Admin Page
module.exports.editAdminPage = async (req, res) => {
  try {
    const singleAdmin = await Admin.findById(req.params.adminId);
    return res.render("admin/editAdmin", {singleAdmin });
  } catch (err) {
    req.flash("error","Admin not found");
    return res.redirect("/admin/viewAdminPage");
  }
};


// Update Admin Logic
module.exports.updateAdmin = async (req, res) => {
  try {

    const admin = await Admin.findById(req.cookies.adminId);
    if (!admin) {
      req.flash("error","Unauthorized");
      return res.redirect("/");
    }

    if (req.file) {
      req.body.profile_image = req.file.path;
      const updateAdmin = await Admin.findByIdAndUpdate(req.params.adminId, req.body);

      if (updateAdmin.profile_image)  fs.unlink(updateAdmin.profile_image, () => {});
      req.flash("success","Admin Updated Successfully");
      return res.redirect("/profile");

    } else {
      const updateAdmin = await Admin.findByIdAndUpdate(req.params.adminId, req.body,{ new: true } );

      if (!updateAdmin) {
        req.flash("error","Admin Not Updated");
        return res.redirect("/admin/viewAdminPage");
      }

      req.flash("success","Admin Updated Successfully");
      return res.redirect("/admin/viewAdminPage");
    }

  } catch (err) {
     req.flash("error", "Not Edit successfully");
    return res.redirect("/admin/viewAdminPage");
  }
};

//Delete
module.exports.deleteAdmin = async (req, res) => {
  try {

    const { adminId } = req.params;
    const deletedUser = await Admin.findByIdAndDelete(adminId);

    if(!deletedUser){
      req.flash("error","Admin Not Found");
      return res.redirect("/admin/viewAdminPage");
    }

    if (deletedUser.profile_image) {
      fs.unlink(deletedUser.profile_image, (err) => {
        if (err) console.log("Fs-unlink error:", err);
      });
    }

    req.flash("success", `${deletedUser.fname} Deleted successfully`);
    return res.redirect("/admin/viewAdminPage");

  } catch (err) {
    req.flash("error","Delete Failed");
    return res.redirect("/admin/viewAdminPage");
  }
};

// --- Password ---

module.exports.changePasswordPage = async (req, res) => {
  try {
    return res.render("profile/changePassword");
  } catch (err) {
       req.flash("error","Unable to open password page");
    return res.redirect("/dashboard");
  }
};

module.exports.changePassword = async (req, res) => {
  try {

    let admin = res.locals.admin;
    const { current_psw, new_psw, confirm_psw } = req.body;

    if (current_psw !== admin.password) {
      req.flash("error", "Current password incorrect");
      return res.redirect("/changePasswordPage");
    }

    if (current_psw === new_psw) {
      req.flash("error", "New password cannot be same as old");
      return res.redirect("/changePasswordPage");
    }

    if (new_psw !== confirm_psw) {
      req.flash("error", "Passwords do not match");
      return res.redirect("/changePasswordPage");
    }

    await Admin.findByIdAndUpdate(admin._id, { password: new_psw });

    req.flash("success", "Password Changed Successfully");
    removeSession(req, res);

  } catch (err) {
    req.flash("error", "Something went wrong");
    return res.redirect('/');
  }  
};

// --- Forgot Password ---

module.exports.forgetPage = (req, res) => {
  return res.render('auth/forgetPage');
}

module.exports.verifyEmail = async (req, res) => {
  try {

    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin){
      req.flash("error","Email not registered");
      return res.redirect("/forgetPage");
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "thelearner1326@gmail.com", pass: "gszcimhtutgtobnf" },
    });

    await transporter.sendMail({
      from: '"Admin Panel Support" <thelearner1326@gmail.com>',
      to: req.body.email,
      subject: "OTP Verification",
      html: `
<div style="margin:0;padding:0;background-color:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.08);overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4e73df,#1cc88a);padding:20px;text-align:center;color:#fff;">
              <h2 style="margin:0;font-weight:600;">Admin Panel</h2>
              <p style="margin:5px 0 0;font-size:13px;opacity:0.9;">Secure Verification</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;text-align:center;color:#333;">
              <h3 style="margin-top:0;">OTP Verification</h3>
              <p style="font-size:14px;color:#666;">
                Use the following One-Time Password to continue login.
              </p>

              <div style="margin:25px 0;">
                <span style="
                  display:inline-block;
                  background:#f4f6fb;
                  border:2px dashed #4e73df;
                  padding:15px 30px;
                  font-size:28px;
                  letter-spacing:6px;
                  font-weight:bold;
                  color:#4e73df;
                  border-radius:8px;
                ">
                  ${OTP}
                </span>
              </div>

              <p style="font-size:13px;color:#888;">
                This OTP will expire in <b>5 minutes</b>.
              </p>

              <p style="font-size:12px;color:#aaa;margin-top:25px;">
                If you did not request this, please ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f9fc;padding:15px;text-align:center;font-size:12px;color:#888;">
              © ${new Date().getFullYear()} Admin Panel. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</div>
`

    });

    res.cookie("OTP", OTP);
    res.cookie("Id", admin._id);

    req.flash("success","OTP sent to email");
    return res.redirect("/otp-page");

  } catch (err) {
    req.flash("error","Email verification failed");
    return res.redirect("/forgetPage");
  }
};

module.exports.OTPpage = (req, res) => {
  if (req.cookies.OTP) return res.render("auth/OTPpage");
  return res.redirect("/dashboard"); 
};

module.exports.OTPVerify = (req, res) => {

  if (req.body.adminOTP == req.cookies.OTP) {
    res.clearCookie("OTP");
    return res.redirect("/newPasswordPage");
  }

  req.flash("error","Invalid OTP");
  return res.redirect("/otp-page");
};

module.exports.newPasswordPage = (req, res) => {
  if (!req.cookies.Id) return res.redirect("/");
  req.flash("error","Session expired");
  res.render("auth/newPassword");
};

module.exports.changeNewPassword = async (req, res) => {
  try {
    if (!req.cookies.Id){
      req.flash("error","Unauthorized access");
       return res.redirect("/forgetPage");
    }

    const { new_password, confirm_password } = req.body;

    if (new_password !== confirm_password){
      req.flash("error","Passwords do not match");
      return res.redirect("/newPasswordPage");
    }

    await Admin.findByIdAndUpdate(req.cookies.Id,{ password: new_password });

    res.clearCookie("Id");
    req.flash("success","Password Reset Successful");
    return res.redirect("/");

  } catch (err) {
    req.flash("error","Reset Failed");
    return res.redirect("/");
  }
};

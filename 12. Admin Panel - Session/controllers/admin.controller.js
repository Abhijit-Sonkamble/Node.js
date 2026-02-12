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
    console.log("Error in loginPage:", err);
    return res.render("auth/login");
  }
};

// Login Logic
module.exports.checkLogin = async (req, res) => {
  try {
     req.flash('success', "Admin Login Successfully..");
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin || admin.password !== req.body.password) {
      console.log("Invalid Email or Password");
      return res.redirect("/");
    }
    res.cookie("adminId", admin._id);
    return res.redirect("/dashboard");
  } catch (err) {
    req.flash('error', "Admin Login Failed..");
    console.log("Error in checkLogin:", err);
    return res.redirect("/");
  }
};

// Logout
module.exports.logout = (req, res) => {
  removeSession(req,res);
};


// Dashboard
module.exports.dashboardPage = async (req, res) => {
  try {
    return res.render("dashboard");
  } catch (err) {
    console.log("Error in dashboardPage:", err);
    return res.redirect("/");
  }
};

// Profile Page
module.exports.profilePage = async (req, res) => {
  try {
    const admin = req.user;
    return res.render("profile/profilePage", { admin });
  } catch (err) {
    console.log("Error in profilePage:", err);
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
    console.log("Error in viewAdminPage:", err);
    return res.redirect("/dashboard");
  }
};



// Add Admin Page
module.exports.addAdminPage = async (req, res) => {
  try {
    return res.render("admin/addAdmin");
  } catch (err) {
    console.log("Error in addAdminPage:", err);
    return res.redirect("/dashboard");
  }
};

// Insert Admin Logic
module.exports.insertAdmin = async (req, res) => {
  try {
    console.log(req.file);
  req.body.profile_image = req.file.path;
   const addAdmin =  await Admin.create(req.body);

  // Flash Message
  if(addAdmin){
    req.flash('success', "Add admin successfully....")
    console.log("Add admin successfully....");
  }
  else{
     req.flash('error', "Admin not Add....")
    console.log("Admin not Add....");
    
  }
    return res.redirect("/admin/addAdminPage");
  } catch (err) {
    req.flash('error', "Something went wrong....")
    console.log("Error in insertAdmin:", err);
    return res.redirect("/admin/addAdminPage");
  }
};

// Edit Admin Page
module.exports.editAdminPage = async (req, res) => {
  try {
    const singleAdmin = await Admin.findById(req.params.adminId);
    return res.render("admin/editAdmin", {singleAdmin });
  } catch (err) {
    console.log("Error in editAdminPage:", err);
    return res.redirect("/admin/viewAdminPage");
  }
};


// Update Admin Logic
module.exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.cookies.adminId);
    if (!admin) {
      return res.redirect("/");
    }

    if (req.file) {
      req.body.profile_image = req.file.path;
      const updateAdmin = await Admin.findByIdAndUpdate(
        req.params.adminId,
        req.body,
      );
      if (updateAdmin.profile_image)  fs.unlink(updateAdmin.profile_image, () => {});
      return res.redirect("/profile");
    } else {
      const updateAdmin = await Admin.findByIdAndUpdate(req.params.adminId, req.body,{ new: true } );
      if (!updateAdmin) {
        return res.redirect("/admin/viewAdminPage");
      }
      return res.redirect("/admin/viewAdminPage");
    }

    // return (req.params.adminId === req.cookies.adminId)? res.redirect("/profilePage") : res.redirect("/admin/viewAdmin") work nhi kar raha


  } catch (err) {
    console.error("Update Error:", err);
    return res.redirect("/admin/viewAdminPage");
  }
};

//Delete
module.exports.deleteAdmin = async (req, res) => {
  try {

    
    // Change from .query to .params
    const { adminId } = req.params;
    const deletedUser = await Admin.findByIdAndDelete(adminId);

    //Flashh msg
    req.flash("success", `${deletedUser.fname}  Deleted succefully`);

    if (deletedUser && deletedUser.profile_image) {
      // Delete the image file from the server
      fs.unlink(deletedUser.profile_image, (err) => {
        if (err) console.log("Fs-unlink error:", err);
      });
    }
    return res.redirect("/admin/viewAdminPage");
  } catch (err) {
    console.error("Delete Error:", err);
    return res.redirect("/admin/viewAdminPage");
  }
};

// --- Password ---

module.exports.changePasswordPage = async (req, res) => {
  try {
    return res.render("profile/changePassword");
  } catch (err) {
    return res.redirect("/dashboard");
  }
};

module.exports.changePassword = async (req, res) => {
  try {

    let admin = res.locals.admin;

   console.log(req.body)
    const { current_psw, new_psw, confirm_psw } = req.body;

    if (current_psw === new_psw) {
      console.log("Current Password and new password are same..");
      return res.redirect("/changePasswordPage");
    }
    if (current_psw !== admin.password) {
      console.log("Current password does not match");
      return res.redirect("/changePasswordPage");
    }

    if (new_psw !== confirm_psw) {
      console.log("New passwords do not match");
      return res.redirect("/changePasswordPage");
    }

const adminChangePassword = await Admin.findByIdAndUpdate(admin._id, { password: new_psw }, { new: true });

        if (adminChangePassword) {
            console.log("Password changed...");
            console.log("Session Remove");

            removeSession(req, res);
        } else {
            console.log("Password not changed...");
            return res.redirect('/dashboard');
        }

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
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
    if (!admin) return res.redirect("/verify-email");

    const OTP = Math.floor(100000 + Math.random() * 900000);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "thelearner1326@gmail.com", pass: "gszcimhtutgtobnf" },
    });

    //Admin otp

  await transporter.sendMail({
  from: '"Admin Panel Support" <thelearner1326@gmail.com>', 
  to: req.body.email,
  subject: "🔐 OTP Verification Code",
  html: `
    <div style="font-family: 'Nunito', sans-serif; background-color: #f8f9fc; padding: 40px 0; color: #333;">
        <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            
            <div style="background: linear-gradient(135deg, #4e73df 0%, #224abe 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">Admin Panel</h1>
            </div>

            <div style="padding: 40px 30px; text-align: center;">
                <h2 style="color: #4e73df; margin-bottom: 20px;">Verify Your Identity</h2>
                <p style="font-size: 16px; color: #858796; line-height: 1.6;">
                    Hello Admin,<br>
                    Use the verification code below to reset your password. This OTP is valid for a limited time.
                </p>

                <div style="margin: 35px 0; padding: 20px; background: #f8f9fc; border: 2px dashed #d1d3e2; border-radius: 10px;">
                    <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #2e59d9;">${OTP}</span>
                </div>

                <p style="font-size: 13px; color: #b7b9cc;">
                    If you didn't request this, please ignore this email or contact security.
                </p>
            </div>

            <div style="background: #f8f9fc; padding: 20px; text-align: center; border-top: 1px solid #e3e6f0;">
                <p style="margin: 0; font-size: 12px; color: #858796;">
                    &copy; 2026 Admin Panel System. All rights reserved.
                </p>
            </div>
        </div>
    </div>
  `,
});

    res.cookie("OTP", OTP);
    res.cookie("Id", admin._id);
    return res.redirect("/otp-page");
  } catch (err) {
    console.log("Email verification error:", err);
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
  return res.redirect("/otp-page");
};
module.exports.newPasswordPage = (req, res) => {
  if (!req.cookies.Id) return res.redirect("/");

  res.render("auth/newPassword");
};

module.exports.changeNewPassword = async (req, res) => {
  try {
    if (!req.cookies.Id) return res.redirect("/forgetPage");

    const { new_password, confirm_password } = req.body;

    if (new_password !== confirm_password)
      return res.redirect("/newPasswordPage");
    await Admin.findByIdAndUpdate(req.cookies.Id, {
      password: new_password,
    });

    res.clearCookie("Id");
    return res.redirect("/");   
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};


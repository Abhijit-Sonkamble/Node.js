const Admin = require("../model/admin.model");
const fs = require("fs")

// Dashboard
module.exports.dashboard = (req, res) => {
  return res.render("dashboard", { page_name: "dashboard" });
};

// Add Admin Page
module.exports.addAdminPage = (req, res) => {
  return res.render("addAdminPage", { page_name: "add_admin" });
};

// View Admin Page
module.exports.viewAdminPage = async (req, res) => {
  try {
    const allAdmin = await Admin.find();
    return res.render("viewAdminPage", {
      allAdmin,
      page_name: "view_admin",
    });
  } catch (err) {
    console.log("Error fetching admins:", err);
    return res.redirect("/");
  }
};

module.exports.insertAdmin = async (req, res) => {
  try {
    console.log(req.file);

    req.body.profile_image = req.file.path;

    const addAdmin = await Admin.create(req.body);

    if (addAdmin) {
      console.log("Admin Inserted Successfully..");
    } else {
      console.log("Admin Insertion Failed..");
    }
    return res.redirect("/addAdminPage");
  } catch (err) {
    console.log("Something went wrong");
    console.log("Error : ", err);
    return res.redirect("/addAdminPage");
  }
};

//Delete Admin
module.exports.deleteAdmin = async(req, res) => {
  try {
    const deleteuser = await Admin.findByIdAndDelete(req.query.adminId);
    console.log(deleteuser)
    if (deleteuser) {
      fs.unlink(deleteuser.profile_image, ()=>{})
      console.log("Deleted......")
    }else{
      console.log("Admin not delete....")
    }
    return res.redirect("/viewAdminPage");
  } catch (err) {
    console.log("Something went wrong");
    console.log("Error : ", err);
    return res.redirect("/viewAdminPage");
  }
};

const Admin = require("../model/admin.model");
const fs = require("fs");

// Dashboard
module.exports.dashboardPage = (req, res) => {
    return res.render("dashboard");
};

// Add Admin Page
module.exports.addAdmin = (req, res) => {
    return res.render("addAdmin");
};

// View Admin Page
module.exports.viewAdmin = async (req, res) => {
    try {
        const allAdmin = await Admin.find();
        return res.render("viewAdmin", { allAdmin });
    } catch (err) {
        console.log("View Error:", err);
        return res.redirect("/addAdmin");
    }
};

// Insert Admin
module.exports.insert = async (req, res) => {
    try {
        if (req.file) {
            req.body.profile_image = req.file.path;
        }

        await Admin.create(req.body);
        return res.redirect("/viewAdmin");
    } catch (err) {
        console.log("Insert Error:", err);
        return res.redirect("/addAdmin");
    }
};

// Delete Admin
module.exports.deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.query;

        const deletedAdmin = await Admin.findByIdAndDelete(adminId);

        if (deletedAdmin && deletedAdmin.profile_image) {
            fs.unlink(deletedAdmin.profile_image, err => {
                if (err) console.log(err);
            });
        }

        return res.redirect("/viewAdmin");
    } catch (err) {
        console.log("Delete Error:", err);
        return res.redirect("/viewAdmin");
    }
};
// Edut Admin
module.exports.editAdmin = async (req, res) => {
    try {

        const editAdmin = await Admin.findById(req.params.adminId);

        return res.render("editAdmin",{editAdmin});
    } catch (err) {
        console.log("Edit Error:", err);
        return res.redirect("/viewAdmin");
    }
};

const express = require("express");
const multer = require("multer");
const {
    dashboard,
    addAdminPage,
    viewAdminPage,
    insertAdmin,
    deleteAdmin
} = require("../controllers/admin.controller");
const { deleteModel } = require("mongoose");

const route = express.Router();

// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin/");
    },
    filename: (req, file, cb) => {cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// Routes
route.get("/", dashboard);//Dashboard
route.get("/addAdminPage", addAdminPage);//Add Admin
route.get("/viewAdminPage", viewAdminPage);//View page
route.post("/insertAdmin", upload.single("profile_image"), insertAdmin);//Profile image add
route.get("/deleteAdmin", deleteAdmin);


module.exports = route;

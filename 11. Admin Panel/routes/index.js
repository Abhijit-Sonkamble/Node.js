const express = require("express");
const multer = require("multer");
const {
    dashboardPage,
    addAdmin,
    viewAdmin,
    insert,
    deleteAdmin,
    editAdmin
} = require("../controllers/admin.controller");

const route = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profile_img/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Routes
route.get("/", dashboardPage);
route.get("/addAdmin", addAdmin);
route.get("/viewAdmin", viewAdmin);
route.post("/insert", upload.single("profile_image"), insert);
route.get("/delete", deleteAdmin);
route.get("/editAdmin/:adminId", editAdmin);

module.exports = route;

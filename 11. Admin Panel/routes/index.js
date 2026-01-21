const express = require ("express");
const multer = require("multer")
const { dashboardPage, addAdmin, viewAdmin, insert } = require("../controllers/admin.controller");

const route = express.Router();
//Multer for add file in folders
const data = multer.diskStorage({
    destination:(req , file ,cb)=>{
        cb(null,"uploads/profile_img/")
    },
    filename:(req ,file ,cb )=>{
        cb(null , Date.now() + file.originalname);
    }
});

const upload = multer({storage:data});



//Dashboard
route.get("/" , dashboardPage);

//Add Admin
route.get("/addAdmin" , addAdmin);

//View Page
route.get("/viewAdmin" , viewAdmin)

//Insert Page
route.post("/insert" ,upload.single("profile_image"), insert)

module.exports = route;
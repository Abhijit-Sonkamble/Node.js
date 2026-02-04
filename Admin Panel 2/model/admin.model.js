const { name } = require("ejs");
const mongoose = require("mongoose");


const adminSchema = mongoose.Schema({
    fname : String,
    lname : String,
    gender : String,
    email : String,
    phone : String,
    password : String,
    city : String,
    profile_image : String

});

module.exports = mongoose.model("Admin" , adminSchema , "Admin");
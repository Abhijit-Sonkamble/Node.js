const express = require("express");
const path = require("path");
require("./config/admin.db")
const app = express();
const PORT = 1000;

app.set("view engine" , "ejs"); //TEmplate la set kara sathi set use kartat
app.use(express.urlencoded({ extended: true }));//MIddleware la use karnya sathi .use kartat
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Route la connect karala and Routing karala
app.use("/" , require("./routes/index"));

app.listen(PORT , (err)=>{
    if (err) {
        console.log("Sever not Started : ", err);
        return false;
    }
    console.log("Server is started with ",PORT)
})

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require("./config/db.config");

const app = express();
const PORT = 2000;

app.set("view engine" , "ejs");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname , "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/" ,require("./routes/index")); 

app.listen(PORT , (err)=>{
    if (err) {
        console.log("Not started....",err);
        return false;  
    }
    console.log("Started on port 2000...");
})
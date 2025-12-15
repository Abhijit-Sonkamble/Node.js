const express = require("express");
require("./config/db.config")
const app = express();
const PORT = 1000;
app.set("view engine", "ejs");


app.listen(PORT ,  (err) => {
    if(err){
        console.log("Not Started....");
        return false;
    }
    console.log("Started");
});
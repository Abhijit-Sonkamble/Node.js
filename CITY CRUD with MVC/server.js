const express = require("express");
const app = express();
const PORT = 1000;

app.set("view engine", "engine");
app.use(express.urlencoded({express:true}))
 app.listen(PORT , (err)=>{
    if (err) {
        console.log("Not started bcoz of "+err);
        return false;
    }
    console.log("Started in localhost:",PORT);
 })
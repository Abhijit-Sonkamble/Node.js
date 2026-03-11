require("dotenv").config();  
const express = require("express")
const app = express();

//Morgan
const morngan = require("morgan")

require("./config/db.config");
app.use(express.json())

//Morgan require
app.use(morngan("dev"));

//Api
app.use("/api", require("./routes"));



//middleware
app.use(express.urlencoded({ extended: true }));




app.listen(process.env.PORT, (err)=>{
    if (err) {
        console.log("Not started...", err)
        return false;
    }
    console.log("Server started....")
})
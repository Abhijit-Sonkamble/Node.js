const express = require("express");
const app = express();
const PORT = 1000;

app.set("view engine" , "ejs");

app.use("/" , require("./routes/index"))


app.listen(PORT , (err)=>{
    if (err) {
        console.log("Server not started ",err);
        return;
    }

    console.log("Server is started....!");

});
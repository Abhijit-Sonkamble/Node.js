const express = require('express');
const path = require('path');
const app = express();
const PORT = 1000;

app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use("/" ,require("./routes/index")); //Route la server sobt attach karla

app.listen(PORT , (err)=>{
    if (err) {
        console.log("Not started....");

        return false;
    }
    console.log("Started......");
})
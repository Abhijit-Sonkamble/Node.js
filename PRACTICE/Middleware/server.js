const express = require("express");
const app = express();

const PORT = 1000;

app.set("view engine" , "ejs");

//Attached Portfolio
app.use(express.static(__dirname + '/public'));

//MIDDLEWARE
const middleware = (request, response, next)=>{
    console.log("Middleware 1");
    next();
}

app.use(middleware);

app.get("/" , (request , response)=>{
    response.render("website");
})

app.listen(PORT , (err)=>{
    if(err){
        console.log("Server is not started.....");
        return false;
    }
    console.log("Server is started.....!");
})
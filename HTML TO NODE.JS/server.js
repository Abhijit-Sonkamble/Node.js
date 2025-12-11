const express = require('express');
const { request } = require('http');
const app = express();

//PORT
const PORT = 1000;


//setup of views 
app.set("view engine","ejs");

//attached CSS file
console.log(__dirname);
app.use(express.static(__dirname + "/public"));


//Middleware
const middleware = (request,response,next)=>{
    console.log("Middleware 1");
    next();
}

//Not found
app.get("/404",(request,response)=>{
   return response.render("404");
}); 

//use of middleware
app.use(middleware);

app.get("/",(request,response)=>{
    response.render("home");
})

//For error and PORT number
app.listen(PORT, (err)=>{
    if(err){
        console.log("Server is not started=>",err);
        return false;
    }
    console.log("Server is started.....!");

})
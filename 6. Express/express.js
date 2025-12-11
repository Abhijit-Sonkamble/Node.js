const express = require('express');
const fs = require ('fs')
const app =express();


//get he ek method aahe ashya milun 5 asatat 1. app.get 2. app.post 3. app.patch 4. app.put 5. app.delete
app.get("/",(request,response)=>{
    fs.readFile("index.html" ,(err,result)=>{
response.end(result);
    })
});
app.get("/about",(request,response)=>{
    fs.readFile("about.html" ,(err,result)=>{
response.end(result);
    })
});
//serve code
app.listen(8000,(err)=>{
    if(err){
        console.log("Server in not started....",err);
        return false;
    }

    console.log("Server is started.....")
})
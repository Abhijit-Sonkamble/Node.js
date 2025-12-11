const { error } = require('console');
const express = require('express');
const { request } = require('http');
const app = express();
const PORT = 1000;
//Set view engine
app.set("view engine","ejs");

//Middleware => He nehmi output and responses cha var ch banvayche
//next he callback function aahe
const middleware = (request, response, next) => {
    console.log("Middleware 1");
    console.log(request.path);//.path yane aaplyala te kuthun yetey te kalte
    console.log(request.query); //yane aaplyala kay query jatey te kalte
//Yat ase aahe ki jar request mhanun ashi query jat asel jyat age ektr 18 nahitr mothi asel tevha code pudhe jail
    if(request.query.age >=18){
        next();
    }
    else{
        return response.redirect('/notfound');
    }

    next();
}

app.get("/notfound",(request,response)=>{
   return response.render("notfound");
})

//He middleware la use kara sathi banvtat
//middleware he ase variable deun aapn eka specific get madhe pn use karu shakto
app.use(middleware);

//Output and responses
 app.get("/" , (request, response)=>{
    response.render("home");
 })

app.listen(PORT,(error)=>{
    if(error){
        console.log("Server is not started......",error)
        return false;
    }

    console.log("Server is started.....!");
})
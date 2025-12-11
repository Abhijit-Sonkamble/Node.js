const express = require("express");
const app = express();

//View engine set kara sathi

app.set("view engine" , "ejs")

app.use(express.urlencoded());

const PORT = 1000;

let alluser = [ ];
let id = 101;

app.get("/",(request,response)=>{
    response.render("table",{
    name:"Abhijit",
    user:alluser
});
});

//For form
app.get("/adduserinfo",(request,response)=>{
    response.render("form");
});


//For all body
app.post("/adduser", (request, response) => {
    const user = request.body;
    console.log(request.body);
    user.id = id;
    id++;
    alluser.push(user);
    response.redirect("/");
});

//For delete user
app.get("/deleteuser",(request, response)=>{
    console.log(request.query);
    const userid = request.query.userid;

    alluser = alluser.filter((user)=>user.id != userid);
     console.log(alluser);
     response.redirect("/");

})


app.listen(PORT, (err)=>{
    if(err){
        console.log("Server ins no started : ",err);
        return false;
    }
    console.log("Server is started.....");
})
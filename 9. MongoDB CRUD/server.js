const express = require("express");
require("./config/db.config");

//Movie model la export karun ithe require kele
const Movie = require("./model/movie.model");
const app = express();
const PORT = 1000;
app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", (req,res)=>{
  return  res.render("form")
})

app.post("/addProduct" , async(req , res ) => {

  //Form madhla data denya sathi
    console.log(req.body);

    //.create he add kara sathi use hote
    const movieAdded = await Movie.create(req.body);

    if (movieAdded) {

      console.log("Movie added....");
       //Form madhun part home page vr yena sathi
    return res.redirect("/");
    }
    else{
      console.log("Not added");
    }

   
})

app.listen(PORT ,  (err) => {
    if(err){
        console.log("Not Started....!");
        return false;
    }
    console.log("Started.......!");
});
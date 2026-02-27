require("dotenv").config();
//Attachement of mongoose
const mongoose = require("mongoose");

//Attachement of mongo URL
const URL = process.env.Atlas_link

mongoose.connect(URL).then(()=>{
    //Then he use kele nahi tri chalte pn connected zale ki nahi te kalte....
    console.log("Connected")
}).catch(()=>{
    //catch he kahi problem aali tya sathi asate
    console.log("Not connected")
}).finally(()=>{
    console.log("Finally");
})

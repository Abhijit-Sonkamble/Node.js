const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/Employee-Data";

mongoose.connect(URI).then(()=>{
    console.log("MongoDB is connected");
}).catch((err)=>{
    console.log("MOngoDB is not connected....!",err)
})
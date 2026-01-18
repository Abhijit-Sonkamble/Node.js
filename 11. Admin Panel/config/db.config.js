const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/admin_pannel";

mongoose.connect(URI).then(()=>{
    console.log("connected......!")
}).catch(err=>{
    console.log("Not connected......");
})
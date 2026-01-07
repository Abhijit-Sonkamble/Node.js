const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/Movies";

mongoose.connect(URI).then(()=>{
    console.log("Connected.........!");
}).catch((err)=>{
    console.log("Not connected.......",err)
});
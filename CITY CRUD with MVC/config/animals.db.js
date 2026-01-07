const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/City";

mongoose.connect(URI).then(()=>{
    console.log("Connected....");
}).catch(()=>{
    console.log("Not connected.....");
})
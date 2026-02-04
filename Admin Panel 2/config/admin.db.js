const mongoose = require ("mongoose");

const URI = "mongodb://localhost:27017/newAdmin";

mongoose.connect(URI).then(()=>{
    console.log("Connected.....");
}).catch((err)=>{
    console.log("Not Connected : ",err);
})
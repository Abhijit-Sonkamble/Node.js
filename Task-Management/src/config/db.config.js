const mongoose = require("mongoose");
const { error } = require("node:console");

const URI = process.env.MONGO_LINK

mongoose.connect(URI).then(()=> {
    console.log("DB Connected")
}).catch((error)=>{
    console.log("Not Connected : ", error)
})
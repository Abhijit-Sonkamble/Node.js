require("dotenv").config();  
const express = require("express")
const app = express();
require("./config/db.config");
app.use(express.json())

//Api
app.use("/api", require("./routes"))

//middleware
app.use(express.urlencoded({ extended: true }));


//Json data
// app.use("/" , (req, res)=>{
//   const Jsonobject = [
//     {
//         "name" : "abc",
//         "age": 21,
//         "phone" : "vivo t4"
//     },
//     {
//         "Fav":"gym",
//         "number":6353
//     }
//   ]
//   return res.json(Jsonobject)
// });


app.listen(process.env.PORT, (err)=>{
    if (err) {
        console.log("Not started...", err)
        return false;
    }
    console.log("Server started....")
})
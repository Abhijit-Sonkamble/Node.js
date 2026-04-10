//.dotenv
require("dotenv").config();

const express = require("express");

const app = express();

//Morgan
const morgan = require("morgan");

const PORT = process.env.PORT;

//connect db
require("./config/db.config")

//For use morgan
app.use(morgan("dev"));

app.use(express.json())

app.use("/api", require("./routes/"))


app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not started ", err);
        return false;
    }
    console.log("Server started....")
})
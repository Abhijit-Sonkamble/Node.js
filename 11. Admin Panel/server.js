const express = require('express');
const app = express();
const PORT = 1000;

app.listen(PORT , (err)=>{
    if (err) {
        console.log("Not started....");

        return false;
    }
    console.log("Started......");
})
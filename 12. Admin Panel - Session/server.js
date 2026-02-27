const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
//Add Session
const session = require("express-session");
const passport = require('passport');

//Falsh message require
const flash = require("connect-flash")
const { SetFlash } = require('./middleware/connectFlash');
require('./middleware/passport.middleware')
require("./config/db.config");

const app = express();
const PORT = 1000;

app.set("view engine" , "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname , "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser());
//Session add 
app.use(session({
    name:"AdminPanelWithSession",
    secret:"Abhijit@1234", //Do not share
    resave:true,
    saveUninitialized:true,
    cookie:{
        //How many hour you want to stay in website
        maxAge: 1000 * 60 * 60 * 10 // milesecond * minute * hr * how many hour you want
    }
}));

//Flash 
app.use(flash());

//Session require
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.currentAdmin);

app.use(SetFlash);

//Route file insert
app.use("/" ,require("./routes/index")); 

app.listen(PORT , (err)=>{
    if (err) {
        console.log("Not started....",err);
        return false;  
    }
    console.log("Started on port ",PORT);
})
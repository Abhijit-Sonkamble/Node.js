const passport = require("passport"); //Add passport.js
const localStrategy = require("passport-local").Strategy; //Passport local add
const Admin = require("../model/admin.model")

passport.use("localAuth"/*default local ch asate ithe"name change karu shakto"*/,new localStrategy({
    usernameField:"email",
},async(email,password,done)=>{
console.log("Email : ",email);
console.log("Paasword : ",password);

const admin = await Admin.findOne({email});
if (!admin) {
        console.log("Admin not found.!");
        return done(null, false);
    }

    if (password !== admin.password) {
        console.log("Password is wrong..!");
        return done(null, false);
    }

    return done(null, admin);
}));


//Call back function
passport.serializeUser((admin, done) => {
    console.log("Admin Serialize : ", admin);

    return done(null, admin.id);
});

passport.deserializeUser(async(adminId, done)=>{
    const currentadmin = await Admin.findById(adminId);

    return done(null, currentadmin);
});
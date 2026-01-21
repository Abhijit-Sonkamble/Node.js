const Admin = require("../model/admin.model")


//Dashboard 
module.exports.dashboardPage = (req , res)=>{
    return res.render("dashboard")
}

//Add admin
module.exports.addAdmin = (req , res)=>{
    return res.render("addAdmin")
}

//View Page
module.exports.viewAdmin = async (req , res)=>{
    try{
        const allAdmin= await Admin.find();
    return res.render("viewAdmin" , {allAdmin})
    }
    catch(err){
        console.log("Error : ",err);
        return res.redirect("/addAdmin")
    }
}

//Insert page
module.exports.insert = async(req , res)=>{

    try{
        console.log(req.body);

        req.body.profile_image = req.file.path;

        const addAdmin = await Admin.create(req.body);
  
        if (addAdmin) {
            console.log("Add Succefully") 
        }
        else{
            console.log("Not add.....")
        }
        return res.redirect("/addAdmin")
    }catch(err){
        console.log("Error : ",err);
        return res.redirect("/addAdmin")
    }
    console.log(req.body)
}  
//Dashboard 
module.exports.dashboardPage = (req , res)=>{
    return res.render("dashboard")
}

//Add admin
module.exports.addAdmin = (req , res)=>{
    return res.render("addAdmin")
}

//View Page
module.exports.viewAdmin = (req , res)=>{
    return res.render("viewAdmin")
}

//Insert page
module.exports.insert = (req , res)=>{
    // return res.render("insert");
    console.log(req.body)
}  
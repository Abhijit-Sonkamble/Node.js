//Require file of model
const categoryModel = require("../model/category.model")


// Add Admin
module.exports.addCategoryPage = (req,res)=>{
    return res.render("category/addCategory")
}


module.exports.addCategory = async(req, res)=>{
    //Print
    console.log(req.body);
    console.log(req.file);
    
  try {
      console.log(req.file);
    req.body.category_image = req.file.path;
     const addCategory =  await categoryModel.create(req.body);
  
    // Flash Message
    if(addCategory){
      req.flash('success', "Add Category successfully....")
      console.log("Add Category successfully....");
    }
    else{
       req.flash('error', "Category not Add....")
      console.log("Category not Add....");
      
    }
      return res.redirect("/category/addCategoryPage");
    } catch (err) {
      req.flash('error', "Something went wrong....")
      console.log("Error in insertCategory:", err);
      return res.redirect("/category/addCategoryPage");
    }  

    
}

//viewCategory
module.exports.viewCategoryPage = (req,res)=>{
    return res.render("category/viewCategory")
}
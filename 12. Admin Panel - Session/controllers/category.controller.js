//Require file of model
const categoryModel = require("../model/category.model");
const fs = require("fs")
const path = require("path")


// Add Admin
module.exports.addCategoryPage = (req,res)=>{
    return res.render("category/addCategory") //Yat file name yete aani render madhe file
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
      return res.redirect("/category/addCategoryPage"); //he route aahe aani route madhe redirect hote
    }  

    
}

//viewCategory
module.exports.viewCategoryPage = async(req,res)=>{

    try{

        const allCategories = await categoryModel.find()

    return res.render("category/viewCategory", {allCategories})
    }catch(err){
        req.flash("error", "Somemthing went wrong");
        console.log("Error in category view page : ",err);
        return res.redirect("/category/viewCategory")
    }
}

//Delete Category
module.exports.deleteCategory = async (req, res) => {
  try {

    const { categoryId } = req.params;
    const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);

    if(!deletedCategory){
      req.flash("error","Admin Not Found");
      return res.redirect("/category/viewCategoryPage");
    }

    if (deletedCategory.profile_image) {
      fs.unlink(deletedCategory.category_image, (err) => {
        if (err) console.log("Fs-unlink error:", err);
      });
    }

    req.flash("success", `${deletedCategory.category_name} Deleted successfully`);
    return res.redirect("/category/viewCategoryPage");

  } catch (err) {
    req.flash("error","Delete Failed");
    return res.redirect("/category/viewCategoryPage");
  }
};

//Edit category
module.exports.editCategory = async(req , res)=>{
    try{
        const { categoryId } = req.params;
        const singleCategory = await categoryModel.findById(categoryId)
        return res.render("category/editCategory" , {singleCategory})
    } catch (err) {
    req.flash("error","Delete Failed");
    return res.redirect("/category/viewCategoryPage");
  }

}

module.exports.updateCategory = async(req, res)=>{
      try {

          console.log(req.params);
          console.log(req.body);
          console.log(req.file);

          if (req.file) {
            req.body.category_image = req.file.path;
            
          }
            const updateCategory = await categoryModel.findByIdAndUpdate(req.params.categoryId, req.body);

            if (updateCategory) {
              if (req.file) fs.unlink(updateCategory.category_image, () => {});
                req.flash("success", "Updated Successfully...")
            }

            else{
                req.flash("error", "Update failed...")
            }
           return res.redirect("/category/viewCategoryPage");
      } catch (err) {
         req.flash("error", "Not Edit successfully");
        return res.redirect("/category/viewCategory");
      }
}
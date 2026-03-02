const categoryModel = require("../model/category.model");
const SubCategoryModel = require("../model/subCategory.model");
const extraCategoryModel = require("../model/extraCategory.model")


module.exports.addExtraCategoryPage = async(req, res)=>{
    try{
       const allCategory = await categoryModel.find();
       const allSubCategory = await SubCategoryModel.find();
        return res.render("extraCategory/addExtraCategoryPage",{allCategory, allSubCategory})

    }catch(err){
        console.log("Error : ", err);
        req.flash("error", "Something went wrong")
    }
}
 

module.exports.addExtraCategory =  async(req, res)=>{
  try{
    console.log(req.body)
  const addExtraCategory = await extraCategoryModel.create(req.body);
   if (addExtraCategory) {
      req.flash("success", "Extra Category Added Successfully");
    } else {
      req.flash("error", "Extra Category Not Added");
    }
    return res.redirect("/extraCategory/addExtraCategoryPage");
  }
  catch(err){
    req.flash('error', "Something went wrong....")
      console.log("Error in insertCategory:", err);
    return res.redirect("/extraCategory/addExtraCategoryPage");

  }
}
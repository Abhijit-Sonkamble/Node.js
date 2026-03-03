const categoryModel = require("../model/category.model");
const SubCategoryModel = require("../model/subCategory.model");
const extraCategoryModel = require("../model/extraCategory.model")


module.exports.addProductsPage = async(req, res) => {
   try{
          const allCategory = await categoryModel.find();
          const allSubCategory = await SubCategoryModel.find();
          const allExtraCategory = await extraCategoryModel.find();
          console.log(allExtraCategory);
           return res.render("products/addProductsPage",{allCategory, allSubCategory, allExtraCategory})
   
       }catch(err){
           console.log("Error : ", err);
           req.flash("error", "Something went wrong")
       }
}
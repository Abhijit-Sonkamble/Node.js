const categoryModel = require("../model/category.model");
const SubCategoryModel = require("../model/subCategory.model");


//Add sub category
module.exports.addSubCategoryPage =async (req, res)=>{
try{
  const allCategory =   await categoryModel.find()
return res.render("subCategory/addSubCategoryPage", {allCategory});
}catch(err){
    req.flash('error', "Something went wrong....")
      console.log("Error in insertCategory:", err);
      return res.redirect("/subCategory/addSubCategoryPage");
}
}

module.exports.addSubCategory =  async(req, res)=>{
  try{
    console.log(req.body)
  const addSubCategory = await SubCategoryModel.create(req.body);
   if (addSubCategory) {
      req.flash("success", "Subcategory Added Successfully");
    } else {
      req.flash("error", "Subcategory Not Added");
    }
    return res.redirect("/subCategory/addSubCategoryPage");
  }
  catch(err){
    req.flash('error', "Something went wrong....")
      console.log("Error in insertCategory:", err);
      return res.redirect("/subCategory/addSubCategoryPage");
  }
}

//View SubCategory
module.exports.viewSubCategoryPage =  async(req, res)=>{
  try {
    let allSubcategory = await SubCategoryModel.find().populate('category_id', "category_name category_image");//Populate uses
    console.log(allSubcategory)
    return res.render("subCategory/viewSubCategoryPage", { allSubcategory });
  } catch (err) {
    req.flash("error", "Unable to fetch admins");
    return res.redirect("/dashboard");
  }
}

//Edit Subcategory
module.exports.editSubCategory = async(req , res)=>{
    try{
        const { subCategoryId } = req.params;
        const subCategory = await SubCategoryModel.findById(subCategoryId).populate('category_id');
        const allCategory = await categoryModel.find();
        return res.render("subCategory/editSubCategoryPage" , {subCategory,allCategory})
    } catch (err) {
    req.flash("error","edit Failed");
    return res.redirect("/subCategory/viewSubCategoryPage");
  }

}

//Update SubCategory
module.exports.updateSubCategory = async(req, res)=>{
      try {

          console.log(req.params);
          console.log(req.body);


            const updateCategory = await SubCategoryModel.findByIdAndUpdate(req.params.subCategoryId, req.body);

            if (updateCategory) {
                req.flash("success", "Updated Successfully...")
            }

            else{
                req.flash("error", "Update failed...")
            }
           return res.redirect("/subCategory/viewSubCategoryPage");
      } catch (err) {
         req.flash("error", "Not Edit successfully");
        return res.redirect("/subCategory/viewSubCategoryPage");
      }
}

//Delete SubCategory
module.exports.deleteSubcategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(subCategoryId);

    if(!deletedSubCategory){
      req.flash("error","SubCategory not found");
      return res.redirect("/subCategory/viewSubCategoryPage");
    }

    // Delete all extra categories
    const extraCategoryModel = require("../model/extraCategory.model");
    await extraCategoryModel.deleteMany({ subCategory_id: subCategoryId });

    // Delete all products and their images
    const products = require("../model/products.model");
    const fs = require("fs");
    const allProducts = await products.find({ subCategory_id: subCategoryId });
    allProducts.forEach(product => {
      if (product.product_image) {
        fs.unlink(product.product_image, (err) => {
          if (err) console.log("Product image delete error:", err);
        });
      }
    });
    await products.deleteMany({ subCategory_id: subCategoryId });

    req.flash("success", `${deletedSubCategory.SubCategory_name} and related data deleted successfully`);
    return res.redirect("/subCategory/viewSubCategoryPage");

  } catch (err) {
    console.log("Error:", err);
    req.flash("error","Delete Failed");
    return res.redirect("/subCategory/viewSubCategoryPage");
  }
};

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
    // allSubcategory = allSubcategory.filter(
    //   (subadmin) => subadmin.email != res.locals.admin.email,
    // );
    return res.render("subCategory/viewSubCategoryPage", { allSubcategory });
  } catch (err) {
    req.flash("error", "Unable to fetch admins");
    return res.redirect("/dashboard");
  }
}
const categoryModel = require("../model/category.model");
const SubCategoryModel = require("../model/subCategory.model");
const extraCategoryModel = require("../model/extraCategory.model")


//Add Extra Category
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

//View Extra Category

module.exports.viewExtraCategoryPage = async(req, res)=>{
  try {
    let allExtracategory = await extraCategoryModel.find().populate('category_id', "category_name category_image").populate('subCategory_id', "SubCategory_name")  ;//Populate uses
    console.log(allExtracategory)
    return res.render("extraCategory/viewExtraCategoryPage", { allExtracategory });
  } catch (err) {
    req.flash("error", "Unable to fetch admins");
    return res.redirect("/dashboard");
  }
}

//Edit Extra Category
module.exports.editExtraCategoryPage = async (req, res) => {
  try {
    const { extraCategoryId } = req.params;

    const allCategory = await categoryModel.find();
    const allSubCategory = await SubCategoryModel.find();
    const extraCategory = await extraCategoryModel
      .findById(extraCategoryId)
      .populate("category_id")
      .populate("subCategory_id");

    return res.render("extraCategory/editExtraCategoryPage", {
      allSubCategory,
      allCategory,
      extraCategory,
    });

  } catch (err) {
    req.flash("error", "Edit Failed");
    return res.redirect("/extraCategory/viewExtraCategoryPage");
  }
};

module.exports.updateExtraCategory = async(req, res)=>{
      try {

          console.log(req.params);
          console.log(req.body);


            const updateExtraCategory = await extraCategoryModel.findByIdAndUpdate(req.params.extraCategoryId, req.body);

            if (updateExtraCategory) {
                req.flash("success", "Updated Successfully...")
            }

            else{
                req.flash("error", "Update failed...")
            }
           return res.redirect("/extraCategory/viewExtraCategoryPage");
      } catch (err) {
         req.flash("error", "Not Edit successfully");
        return res.redirect("/extraCategory/viewExtraCategoryPage");
      }
}

//Delete Extra Category
module.exports.deleteExtraCategory = async (req, res) => {
  try {

    const { extraCategoryId } = req.params;
    const deletedExtraCategory = await extraCategoryModel.findByIdAndDelete(extraCategoryId);

    if(!deletedExtraCategory){
      req.flash("error","Not deleted successfull");
      return res.redirect("/extraCategory/viewExtraCategoryPage");
    }

    // if (deletedSubCategory.category_image) {
    //   fs.unlink(deletedSubCategory.category_image, (err) => {
    //     if (err) console.log("Fs-unlink error:", err);
    //   });
    // }

    req.flash("success", `${deletedExtraCategory.extraCategory_name} Extra Category Deleted successfully`);
   return res.redirect("/extraCategory/viewExtraCategoryPage");

  } catch (err) {
    req.flash("error","Delete Failed");
    return res.redirect("/extraCategory/viewExtraCategoryPage");
  }
};

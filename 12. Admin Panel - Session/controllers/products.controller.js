const categoryModel = require("../model/category.model");
const SubCategoryModel = require("../model/subCategory.model");
const extraCategoryModel = require("../model/extraCategory.model");
const products = require("../model/products.model");
const fs = require("fs");

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

module.exports.addProducts = async(req, res)=>{
   try {
      if (!req.file) {
        req.flash("error", "Products image required");
        return res.redirect("/products/addProductsPage");
      }
  
      req.body.product_image = req.file.path;
      req.body.category_id = req.body.category;
      req.body.subCategory_id = req.body.subCategory;
      req.body.extraCategory_id = req.body.extraCategory;
      
      const addProducts = await products.create(req.body);
  
      if (addProducts) {
        req.flash("success", "Product Added Successfully");
      } else {
        req.flash("error", "Product Not Added");
      }
  
        return res.redirect("/products/addProductsPage");

    } catch (err) {
      console.log("Error:", err);
      req.flash("error", "Something went wrong");
        return res.redirect("/products/addProductsPage");

    }
}

//View Products
module.exports.viewProductsPage = async(req, res)=>{
  try {
    let allProducts = await products.find().populate('category_id').populate('subCategory_id').populate('extraCategory_id')  ;//Populate uses
    console.log(allProducts)
    return res.render("products/viewProductsPage", { allProducts });
  } catch (err) {
    req.flash("error", "Unable to fetch admins");
    return res.redirect("/dashboard");
  }
}

//Edit Products
module.exports.editProductsPage = async (req, res) => {
  try {
    const { productId } = req.params;

    const allCategory = await categoryModel.find();
    const allSubCategory = await SubCategoryModel.find();
    const allExtraCategory = await extraCategoryModel.find();
    const product = await products
      .findById(productId)
      .populate("category_id")
      .populate("subCategory_id")
      .populate("extraCategory_id");

    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/products/viewProductsPage");
    }

    return res.render("products/editProductsPage", {
      allCategory,
      allSubCategory,
      allExtraCategory,
      product,
    });
  } catch (err) {
    console.log("Error:", err);
    req.flash("error", "Edit Failed");
    return res.redirect("/products/viewProductsPage");
  }
};

module.exports.updateProducts = async (req, res) => {
  try {

    const { productId } = req.params;

    req.body.category_id = req.body.category;
    req.body.subCategory_id = req.body.subCategory;
    req.body.extraCategory_id = req.body.extraCategory;

    if (req.file) {
  const oldProduct = await products.findById(productId);

  if (oldProduct.product_image) {
    fs.unlink(oldProduct.product_image, (err) => {
      if (err) console.log("File delete error:", err);
    });
  }

  req.body.product_image = req.file.path;
}

const updateProduct = await products.findByIdAndUpdate(
  productId,
  req.body,
  { new: true }
);

    if (updateProduct) {
      req.flash("success", "Product Updated Successfully");
    } else {
      req.flash("error", "Update Failed");
    }

    return res.redirect("/products/viewProductsPage");

  } catch (err) {
    console.log(err);
    req.flash("error", "Update Failed");
    return res.redirect("/products/viewProductsPage");
  }
};

//Delete Products
module.exports.deleteProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      req.flash("error", "Product not found");
      return res.redirect("/products/viewProductsPage");
    }

    if (deletedProduct.product_image) {
      fs.unlink(deletedProduct.product_image, (err) => {
        if (err) console.log("File delete error:", err);
      });
    }

    req.flash("success", `${deletedProduct.title} deleted successfully`);
    return res.redirect("/products/viewProductsPage");
  } catch (err) {
    console.log("Error:", err);
    req.flash("error", "Delete Failed");
    return res.redirect("/products/viewProductsPage");
  }
};

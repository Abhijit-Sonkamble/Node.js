const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
    
       //Populate
       category_id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Category",//Aata yala Category cha schema sobt connect kele tr yalach boltata Populate concept
           required:true
       },
        subCategory_id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "SubCategory",
           required:true
       },
      extraCategory_id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "extraCategory",
           required:true
       },
       title:{
           type: String,
           required:true
       },
       price:{
           type: Number,
           required:true
       },
       old_price:{
           type: Number,
           required:true
       },
       stock:{
           type: Number,
           required:true
       },
       description:{
           type: String,
           required:true
       },
       product_image:{
           type: String,
           required:true
       }
   
});

module.exports = mongoose.model('Products', productsSchema, 'Products');
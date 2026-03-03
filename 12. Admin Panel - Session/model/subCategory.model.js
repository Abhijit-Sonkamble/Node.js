const mongoose = require("mongoose");

const SubCategorySchema = mongoose.Schema({
    
    //Populate
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
//Aata yala Category cha schema sobt connect kele tr yalach boltata Populate concept
    },
      SubCategory_name:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('SubCategory', SubCategorySchema, 'SubCategory');
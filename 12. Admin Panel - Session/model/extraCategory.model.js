const mongoose = require("mongoose");

const extraCategorySchema = mongoose.Schema({
    
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
    extraCategory_name:{
        type: String,
        required:true
    },

});

module.exports = mongoose.model('extraCategory', extraCategorySchema, 'extraCategory');
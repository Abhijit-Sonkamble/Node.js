const mongoose = require("mongoose");

const SubCategorySchema = mongoose.Schema({
    SubCategory_name: String,

    //Populate
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
//Aata yala Category cha schema sobt connect kele tr yalach boltata Populate concept
    }
});

module.exports = mongoose.model('SubCategory', SubCategorySchema, 'SubCategory');
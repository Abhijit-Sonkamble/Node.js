const mongoose = require("mongoose");

const adminSchema = mongoose.Schema ({

    f_name: {
        type: String,
        required : true
    },
    l_name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    status: {
        type: Boolean,
        default : false
    },
    isDelete: {
        type: Boolean,
        default : false
    },
    create_at : { // Admin kevha banla tyacha data milel
        type: String,
        required: true
    },
    update_at : { // Admin chya data madhe kadhi changes zale
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Admin" , adminSchema, "Admin")
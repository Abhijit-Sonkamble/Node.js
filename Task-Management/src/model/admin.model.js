const mongoose = require("mongoose");
const { type } = require("node:os");

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
        default : true
    },
})

module.exports = mongoose.model("Admin" , adminSchema, "Admin")
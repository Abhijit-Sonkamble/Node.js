const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({

    title: {
        type : String,
        required : true
    },

    description: {
        type : String,
        required : true
    },
    priority: {
        type : String,
        required : true
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

module.exports = mongoose.model("Tasks", taskSchema, "Tasks");
const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    gender: String
});

module.exports = mongoose.model('Employee', employeeSchema, 'Employee');
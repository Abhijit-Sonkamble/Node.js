const mongoose= require("mongoose");

const animalsSchema = mongoose.Schema({
    name:{type:String, required : true},
    price:{type:Number , required:true},
    color:{type:String , required:true},
    Ram:{type:Number , required:true}
});

module.exports = mongoose.model ("Animals" , animalsSchema);
const mongoose = require("mongoose")

//Schema he ek method aahe
const FootwearSchema =  mongoose.Schema({
    name :{
        type :String,
        required : true
    },

    color: {
        type: String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    size : {
        type:String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

/*mongoose la attached kele tyatun . karun model file attached keli and ("Unique name takayche aani jyache asale te takayche" ,
aani je schema madhe upload kele te, MongoDB madhe je name thevayche storage che te )

*/

//He model la return karte
const Footwear =  mongoose.model("Footwear" , FootwearSchema , "Footwear");


//Dusrya file madhe gheun janya sathi
module.exports = Footwear;
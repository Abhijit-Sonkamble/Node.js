const mongoose = require("mongoose")

//Schema he ek method aahe
const MovieSchema =  mongoose.Schema({
    name :{
        type :String,
        required : true
    },

    release: {
        type: String,
        required : true
    },

    budget : {
        type : Number,
        required : true
    },

    language : {
        type:String,
        required: true
    }
});

/*mongoose la attached kele tyatun . karun model file attached keli and ("Unique name takayche aani jyache asale te takayche" ,
aani je schema madhe upload kele te, MongoDB madhe je name thevayche storage che te )

*/

//He model la return karte
const Movie =  mongoose.model("Movie" , MovieSchema , "Movies");


//Dusrya file madhe gheun janya sathi
module.exports = Movie;
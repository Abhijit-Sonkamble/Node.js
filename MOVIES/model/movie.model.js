const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movie_name: { 
    type: String,
     required: true 
    },
  release_date: { 
    type: Date, 
    required: true 

  },
  movie_type: { 
    type: String, 
    required: true 
  },
  budget: { 
    type: Number, 
    required: true 

  },
  poster: { 
    type: String, 
    required: true 

  }
});

module.exports = mongoose.model("Movie", movieSchema);
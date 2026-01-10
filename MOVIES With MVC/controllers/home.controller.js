const Movie = require("../model/movie.model");
const fs = require('fs');

// Render pages
const tablePage = async (req, res) => {
  try {
    const allMovies = await Movie.find();
    return res.render("table", { allMovies });
  } catch (err) {
    console.log(err);
    res.send("Error..........");
  }
};

const formPage = (req, res) => {
  res.render("form");
};

const updatePage = async (req, res) => {
  try {
    const movie = await Movie.findById(req.query.id);
    res.render("edit", { movie });
  } catch (err) {
    console.error(err);
    res.send("Error.... for edit");
  }
};

// Actions
const addMovie = async (req, res) => {
  try {

    // console.log("Add Movie");
    // console.log(req.file);
    // console.log(req.body);

    req.body.poster = req.file.path;
    
    const movieData = await Movie.create(req.body);

    // await Movie.create(movieData);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.redirect('/add');
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id, ...data } = req.body;

    if (req.file) {
      data.poster = `/uploads/${req.file.filename}`;
    }

    await Movie.findByIdAndUpdate(id, data);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error updating movie");
  }
};

const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.query.id);

    console.log("Deleted Movie : ",deletedMovie);
    console.log(__dirname);    

    fs.unlink(deletedMovie.poster, (err)=> {
      if(err) {
        console.log("Error : ",err);
      }
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error deleting movie");
  }
};

module.exports = {
  tablePage,
  formPage,
  updatePage,
  addMovie,
  updateMovie,
  deleteMovie,
};
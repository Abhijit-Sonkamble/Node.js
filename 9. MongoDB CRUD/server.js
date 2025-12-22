const express = require("express");
require("./config/db.config");

//Movie model la export karun ithe require kele
const Movie = require("./model/movie.model");
const app = express();
const PORT = 1000;
app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", async (req, res) => {
  //.find he fetch karte data la hi ek feature method aahe
  const allMovies = await Movie.find();
  console.log(allMovies);
  return res.render("table", { allMovies });
});

//Add kelyavr movie chya page vr gheun janya sathi
app.get("/addMoviePage", (req, res) => {
  return res.render("form");
});

app.post("/addMovie", async (req, res) => {
  //Form madhla data denya sathi
  console.log(req.body);

  //.create he add kara sathi use hote
  const movieAdded = await Movie.create(req.body);

  if (movieAdded) {
    console.log("Movie added....");
  } else {
    console.log("Not added");
  }
  //Form madhun part home page vr yena sathi
  return res.redirect("/");
});

//Edit Route
app.get("/editMovie/:editId", async (req, res) => {
  //params he ek object dete je / nantar asel te
  console.log(req.params);

  //.findById hi pn ek method aahe Id dyaychi tya related id fetch karun deil
  const movie = await Movie.findById(req.params.editId);

  console.log(movie);

  if (movie) {
    return res.render("edit", { movie });
  } else {
    return res.redirect("/");
  }
});

//Update Data
app.post("/Update", async (req, res) => {
  //.findByIdAndUpdate he id la find karun tyat jo data aahe tyala update karte
  const UpdateMovie = await Movie.findByIdAndUpdate(req.body.id, req.body, {new: true,});//new:true ne new ch data bhetel old nahi bhetnar

  return res.redirect("/");
});

//Delete Movie
app.get("/deleteMovie", async (req, res) => {
  console.log(req.query);

  //.findByIdAndDelete hi ek method aahe ji id la find karun delete karte
  const deleteMovie = await Movie.findByIdAndDelete(req.query.id);

  if (deleteMovie) {
    console.log("Deleted....");
  } else {
    console.log("Not deleted....");
  }

  return res.redirect("/");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Not Started....!");
    return false;
  }
  console.log("Started.......!");
});

  const express = require("express");
  const multer = require("multer");
  const path = require("path");

  const {
    tablePage,
    formPage,
    updatePage,
    addMovie,
    updateMovie,
    deleteMovie,
  } = require("../controllers/home.controller");

  const route = express.Router();

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage });


  // Render pages
  route.get("/", tablePage);
  route.get("/add", formPage);
  route.get("/edit", updatePage);

  // Form actions
  route.post("/addMovie", upload.single("poster"), addMovie);
  route.post("/update", upload.single("poster"), updateMovie);
  route.get("/delete", deleteMovie);

  module.exports = route;
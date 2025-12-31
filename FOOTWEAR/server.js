const express = require("express");
require("./config/db.config");
const path = require("path");


const Footwear = require("./model/footwear.model");
const app = express();
const PORT = 1000;

app.set("view engine", "ejs");
app.use(express.urlencoded());

// //Attached css
app.use(express.static(__dirname + "/public"));
// console.log(__dirname);

app.get("/", async (req, res) => {
  //.find he fetch karte data la hi ek feature method aahe
  const allFootwear = await Footwear.find();
  console.log(allFootwear);
  return res.render("table", { allFootwear });
});


app.get("/addFootwearPage", (req, res) => {
  return res.render("form");
});

app.post("/addFootwear", async (req, res) => {
  //Form madhla data denya sathi
  console.log(req.body);

  //.create he add kara sathi use hote
  const footwearAdded = await Footwear.create(req.body);

  if (footwearAdded) {
    console.log("Footwear added....");
  } else {
    console.log("Not added");
  }
  //Form madhun part home page vr yena sathi
  return res.redirect("/");
});

//Edit Route
app.get("/editFootwear/:editId", async (req, res) => {
  //params he ek object dete je / nantar asel te
  console.log(req.params);

  //.findById hi pn ek method aahe Id dyaychi tya related id fetch karun deil
  const footwear = await Footwear.findById(req.params.editId);

  console.log(footwear);

  if (footwear) {
    return res.render("edit", { footwear });
  } else {
    return res.redirect("/");
  }
});

//Update Data
app.post("/Update", async (req, res) => {
  //.findByIdAndUpdate he id la find karun tyat jo data aahe tyala update karte
  const UpdateFootwear = await Footwear.findByIdAndUpdate(req.body.id, req.body, {new: true,});//new:true ne new ch data bhetel old nahi bhetnar

  return res.redirect("/");
});

//Delete Footwear
app.get("/deleteFootwear", async (req, res) => {
  console.log(req.query);

  //.findByIdAndDelete hi ek method aahe ji id la find karun delete karte
  const deleteFootwear = await Footwear.findByIdAndDelete(req.query.id);

  if (deleteFootwear) {
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

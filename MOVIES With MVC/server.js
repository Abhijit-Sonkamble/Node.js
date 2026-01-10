const express = require("express");
require("./config/db.config"); // Make sure this connects to MongoDB

const app = express();
const PORT = 1000;

// EJS setup
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server failed to start!");
    return;
  }
  console.log("Started");
});

const path = require("path");

const express = require("express");

const app = express();

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./online.html"));
});

app.get("/list/list.html", function(req, res) {
  res.sendFile(path.join(__dirname, "/list/list.html"));
});

app.listen("80", "localhost", function(err) {
  if (err) {
    console.log(err);

    return;
  }

  console.log("Listening at http://localhost:80");
});

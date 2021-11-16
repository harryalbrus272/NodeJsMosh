//Major.Minor.Patch
const _ = require("underscore");
// Core Modules
// File or Folder
// node_modules
console.log(_.contains([1, 2, 3], 3));
//

const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
console.log(PORT);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

// app.post();
// app.put();
// app.delete();

app.listen(PORT, () => {
  console.log("Listening on port 3050");
});

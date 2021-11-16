//Major.Minor.Patch
const _ = require("underscore");
// Core Modules
// File or Folder
// node_modules
console.log(_.contains([1, 2, 3], 3));
//
const Joi = require("joi");
const express = require("express");
const app = express();
//express.json middleware
app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT;
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

const schema = Joi.object({
  name: Joi.string().min(3).required(),
});
console.log(PORT);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.post("/api/courses", async (req, res) => {
  const result = await schema.validate(req.body);
  if (!result.error) {
    const course = { id: courses.length + 1, name: req.body.name };
    courses.push(course);
    return res.status(200).send(course);
  } else {
      //Bad request
    return res
    .status(400)
    .send("Name is required and should be a minimum of 3 characters");
  }
});

//Route parameter
/** Query string params are also used using req.query  */
app.get("/api/courses/:id", (req, res) => {
  //res.send(req.params.id, req.params.year);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The course not found");
  res.status(200).send(course);
});

// app.post();
// app.put();
// app.delete();

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

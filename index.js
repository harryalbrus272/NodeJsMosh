//Major.Minor.Patch
const _ = require('underscore');
// Core Modules
// File or Folder
// node_modules
console.log(_.contains([1, 2, 3], 3));

const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const log = require('./logger');
const config = require('config');
const app = express();
//express.json middleware
app.use(express.json());
//in-built middleware
app.use(express.urlencoded({ extended: true }));
//static assets in this folder
app.use(express.static('public'));
//Custom middleware function

//Third -party middlewares
app.use(helmet());

//Configuration - We can use npm rc package. But the config is better to store the configurations
console.log('Application Name: ', config.get('name'));
console.log('Mail Server: ', config.get('mail.host'));

console.log(`Node environment: ${process.env.NODE_ENV}`); //development, testing, staging and production
console.log(`Environment in which the app is running: ${app.get('env')}`);
/** Middleware functions are called in order they are passed to the app */
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan logging');
}
app.use(log);
require('dotenv').config();
const PORT = process.env.PORT;
const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

const schema = Joi.object({
  name: Joi.string().min(3).required(),
});
console.log(PORT);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', async (req, res) => {
  const result = await schema.validate(req.body);
  console.log(result);
  const error = result;
  if (!error) {
    const course = { id: courses.length + 1, name: req.body.name };
    courses.push(course);
    return res.status(200).send(course);
  } else {
    //Bad request
    const [details] = error.details;
    console.log(details.message);
    return res
      .status(400)
      .send('Name is required and should be a minimum of 3 characters');
  }
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course not found');

  const result = schema.validate(req.body);

  if (!result.error) {
    course.name = req.body.name;
    return res.status(200).send(course);
  } else {
    //Bad request
    const [details] = result.error.details;
    console.log(details.message);
    return res
      .status(400)
      .send('Name is required and should be a minimum of 3 characters');
  }
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.status(200).send(course);
});

//Route parameter
/** Query string params are also used using req.query  */
app.get('/api/courses/:id', (req, res) => {
  //res.send(req.params.id, req.params.year);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course not found');
  res.status(200).send(course);
});

// app.post();
// app.put();
// app.delete();

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

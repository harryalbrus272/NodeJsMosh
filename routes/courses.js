const express = require('express');
const router = express.Router();
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(3).required(),
});

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.post('/', async (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.status(200).send(course);
});

//Route parameter
/** Query string params are also used using req.query  */
router.get('/:id', (req, res) => {
  //res.send(req.params.id, req.params.year);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course not found');
  res.status(200).send(course);
});
module.exports = router;

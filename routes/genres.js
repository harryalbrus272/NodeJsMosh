const express = require('express');
const router = express.Router();
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
});

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
  { id: 4, name: 'Biopic' },
];

router.get('/', (req, res) => {
  res.send(genres);
});

router.post('/', async (req, res) => {
  const result = await schema.validate(req.body);
  console.log(result);
  const error = result;
  if (!error) {
    const course = { id: genres.length + 1, name: req.body.name };
    genres.push(course);
    return res.status(200).send(course);
  } else {
    //Bad request
    const [details] = error.details;
    console.log(details.message);
    return res
      .status(400)
      .send('Genres\' name is required');
  }
});

router.put('/:id', (req, res) => {
  const course = genres.find((c) => c.id === parseInt(req.params.id));
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
      .send('Genres\'name is required');
  }
});

router.delete('/:id', (req, res) => {
  const course = genres.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course not found');

  const index = genres.indexOf(course);
  genres.splice(index, 1);
  res.status(200).send(course);
});

//Route parameter
/** Query string params are also used using req.query  */
router.get('/:id', (req, res) => {
  //res.send(req.params.id, req.params.year);
  const course = genres.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course not found');
  res.status(200).send(course);
});
module.exports = router;

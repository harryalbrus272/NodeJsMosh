const express = require('express');
const router = express.Router();
const Joi = require('joi');
const auth = require('../../middleware/auth');
const checkAdmin = require('../../middleware/admin');
const asyncMiddleware = require('../../middleware/async');
const { Genre } = require('../../models/index');

const schema = Joi.object({
  name: Joi.string().required(),
});

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
  { id: 4, name: 'Biopic' },
];

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const genres = await Genre.find({}).sort('name');
    return res.send(genres);
  })
);

router.post(
  '/',
  auth,
  asyncMiddleware(async (req, res) => {
    const result = await schema.validate(req.body);
    const { error } = result;
    if (!error) {
      let genres = new Genre({ name: req.body.name });
      genres = await genres.save();
      return res.status(200).send(genres);
    } else {
      //Bad request
      const [details] = error.details;
      console.log(details.message);
      return res.status(400).send("Genres' name is required");
    }
  })
);

router.put(
  '/:id',
  auth,
  asyncMiddleware(async (req, res) => {
    const result = schema.validate(req.body);
    if (!result.error) {
      const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
      );
      if (!genre) res.status(404).send('The genre not found');
      return res.status(200).send(genre);
    } else {
      //Bad request
      const [details] = result.error.details;
      console.log(details.message);
      return res.status(400).send("Genres'name is required");
    }
  })
);

router.delete(
  '/:id',
  auth,
  checkAdmin,
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre not found');
    res.status(200).send(genre);
  })
);

//Route parameter
/** Query string params are also used using req.query  */
router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    //res.send(req.params.id, req.params.year);
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre not found');
    res.status(200).send(genre);
  })
);
module.exports = router;

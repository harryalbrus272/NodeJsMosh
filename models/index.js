const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});
const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });
  return schema.validate(genre);
}

const Movie = mongoose.model(
  'Movies',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    }
  })
);

function validateMovies () {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  });
  return schema.validate(movie, schema);
}

const Customer = mongoose.model(
  'Customers',
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 60,
    },
    phoneNumber: {
      type: Number,
      required: true,
      min: 1000000000,
      max: 9999999999,
      maxlength: 10,
    },
  })
);

module.exports = { Genre, Customer, Movie, genreSchema,  validateGenre, validateMovies};

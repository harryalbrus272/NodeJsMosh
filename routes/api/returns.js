// POST /api/returns {customerId, movie}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if not rental is found for the customer and movie
// Return 400 if the return has already been processed.
// Return 200 if the valid request
// Send the return data and the rental fee
// Increase the stock of the particular movie
const {
  Movie,
  validateMovies,
  Rental,
  validateRental,
} = require('../../models');
const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const moment = require('moment');
const validate = require('../../middleware/validate');

router.post('/', [auth, validate(validateRental)], async (req, res) => {
  try {
    const { movieId, customerId } = req.body;
    const rental = await Rental.lookup(customerId, movieId);
    if (!rental) return res.status(404).send('Rental not found');
    if (rental.dateReturned)
      return res.status(400).send('Return already processed');
    rental.dateReturned = new Date();
    const rentalDays = moment().diff(rental.dateOut, 'days');
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;

    await Movie.findByIdAndUpdate(rental.movie._id, {
      $inc: { numberInStock: 1 },
    });

    await rental.save();
    return res.status(200).send({ rental });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

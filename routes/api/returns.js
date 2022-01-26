// POST /api/returns {customerId, movie}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if not rental is found for the customer and movie
// Return 400 if the return has already been processed.
// Return 200 if the valid request
// Send the return data and the rental fee
// Increase the stock of the particular movie
const { Movie, validateMovies, Rental } = require('../../models');
const { Genre } = require('../../models');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

router.post('/', async (req, res) => {
  const { movieId, customerId } = req.body;
  if (!customerId)
    return res.status(400).send('CustomerId not provided');
  if (!movieId) return res.status(400).send('MovieId not provided');
  const rental = await Rental.findOne({ 'movie._id': movieId, 'customer._id': customerId });
  if(!rental) return res.status(404).send('Rental not found');
  res.status(401).send('Unauthorized');
});

module.exports = router;

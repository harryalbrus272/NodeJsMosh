// POST /api/returns {customerId, movie}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if not rental is found for the customer and movie
// Return 400 if the return has already been processed.
// Return 200 if the valid request
// Send the return data and the rental fee
// Increase the stock of the particular movie
const { Movie, validateMovies } = require('../../models');
const { Genre } = require('../../models');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

router.post('/', async (req, res) => {
    res.status(401).send('Unauthorized');
});
router.post('/returns', async (req, res) => {
    res.status(401).send('Unauthorized');
});

module.exports = router;

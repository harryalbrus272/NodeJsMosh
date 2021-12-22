const express = require('express');
const router = express.Router();
router.use('/courses', require('./courses'));
router.use('/genres', require('./genres'));
router.use('/customers', require('../api/customers'));
router.use('/movies', require('./movies'));
router.use('rentals', require('./rental'));
module.exports = router;
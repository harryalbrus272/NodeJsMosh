const express = require('express');
const router = express.Router();
router.use('/', require('./home'));
router.use('/api', require('./api'));
module.exports = router;
const express = require('express');
const user = require('./user');
const fileOperations = require('./fileOperations');

const router = express.Router();

router.use('/user', user);
router.use('/file',fileOperations);
module.exports = router;
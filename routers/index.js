const express = require('express');
const user = require('./user');
const fileOperations = require('./fileOperations');
const auth = require('./auth');

const router = express.Router();

router.use('/user', user);
router.use('/file',fileOperations);
router.use('/auth', auth);

module.exports = router;
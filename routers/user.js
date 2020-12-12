const express = require('express');
const { getInfo } = require('../controllers/user');
const { yupValidate } = require('../helpers/validation/yupValidate');
const router = express.Router();

router.get('/info', getInfo);
router.get('/hello/:name', yupValidate);

module.exports = router;
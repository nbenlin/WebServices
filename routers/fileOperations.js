const express = require('express');
const { storeData } = require('../controllers/fileOperations');

const router = express.Router();

router.post('/store', storeData);

module.exports = router;
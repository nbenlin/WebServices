const express = require('express');
const { storeData, parsing } = require('../controllers/fileOperations');

const router = express.Router();

router.post('/store', storeData);
router.post('/parse', parsing);

module.exports = router;
const express = require('express');
const { login, getUser } = require('../controllers/auth');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const router = express.Router();

router.get('/login', login);
router.get('/profile',getAccessToRoute, getUser);


module.exports = router;
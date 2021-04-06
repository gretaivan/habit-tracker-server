const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/login', usersController.find);

module.exports = router;
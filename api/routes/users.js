const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/register', usersController.create);
router.post('/login', usersController.find);

module.exports = router;
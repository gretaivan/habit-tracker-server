const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')

router.get('/', habitsController.all)
router.post('/', habitsController.create)

module.exports = router;
const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')

router.get('/user/:id', habitsController.all)
router.post('/', habitsController.create)
router.get('/:id', habitsController.findHabitById)
router.patch('/:id', habitsController.updateHabit)
router.patch('/reset/:id', habitsController.updateCompleted)
module.exports = router;
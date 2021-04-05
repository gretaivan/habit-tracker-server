const express = require('express');
const router = express.Router();

const Habit = require('../models/Habit')


//create Habit Route 
// habit_name and frequency will be the only paramaters chosen by the user, others will be set automatically to 0

router.post('/', async (req, res) => {
    try {
        const habit = await Habit.create(req.body.habit_name, req.body.frequency)
        res.status(201).json(habit)
    } catch(err) {
        res.status(404).json({err})
    }
})



module.exports = router;
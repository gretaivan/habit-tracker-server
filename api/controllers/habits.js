const express = require('express');
const router = express.Router();

const Habit = require('../models/Habits')

router.get('/', async (req, res) => {
    try {
        const habits = await Habit.all
        res.json(habits)
    } catch (err) {
        res.status(500).send({ err })
    }
})
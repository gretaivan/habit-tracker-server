const express = require('express');
const router = express.Router();

const Habit = require('../models/habits')



async function create(req,res){
    try {
        const habit = await Habit.create(req.body.habit_name, req.body.frequency, res.body.user_id)
        res.status(201).json(habit)
    } catch(err) {
        res.status(404).json({err})
    }
}



module.exports = {create };
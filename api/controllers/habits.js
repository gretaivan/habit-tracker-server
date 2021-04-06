const express = require('express');
const router = express.Router();

const Habit = require('../models/habits')



async function create(req,res){
    try {
        const habit = await Habit.create(req.body.habit_name, req.body.frequency, req.body.user_id)
        res.status(201).json(habit)
    } catch(err) {
        console.log(err)
        res.status(404).json({err})
    }
}



module.exports = {create };


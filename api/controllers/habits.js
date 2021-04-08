const express = require('express');
const router = express.Router();

const Habit = require('../models/habits')


async function all (req, res) {
    try {
        console.log(req.params.id)
        const habits = await Habit.all(parseInt(req.params.id));
        res.status(200).json(habits)
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
}

async function create(req,res){
    try {

        const habit = await Habit.create(req.body.habit_name, req.body.frequency, req.body.user_id)
        res.status(201).json(habit)
    } catch(err) {
        res.status(404).json({err})
    }
}


async function findHabitById(req,res){
    try{
        const habit = await Habit.findHabitById(parseInt(req.params.id))
        res.status(200).json(habit)
    } catch(err){
        res.status(500).json({err})
    }

}


async function updateHabit(req,res){
    try{
        const habitToUpdate = await Habit.findHabitById(parseInt(req.params.id))
        const streak = await Habit.updateStreak(habitToUpdate.user_id, habitToUpdate.habit_name);
        const updatedHabit = await habitToUpdate.update()
        res.status(200).json(updatedHabit)

    } catch(err){

        res.status(500).json({err})


    }
}



module.exports = {create, all, findHabitById, updateHabit };


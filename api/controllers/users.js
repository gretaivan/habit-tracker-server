const express = require('express');
const router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcrypt');

async function find (req, res) {
    try {
        const user = await User.findByUsername(req.body.username);
        if (!user) {
            throw new Error('Invalid Username')
        }
        const authed = await bcrypt.compare(req.body.password, user.password);
        if (!!authed) {
            res.status(200).json({username: req.body.username, id: user.id});
        } else {
            throw new Error('Invalid Password');
        }
    } catch (err) {
        res.status(403).json({err});
    }
}


module.exports = {find};
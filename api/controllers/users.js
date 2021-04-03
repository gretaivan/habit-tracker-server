const User = require('../models/User');
const bcrypt = require('bcrypt');

async function create (req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        await User.create({...req.body, password: hashed});
        res.status(201).json({msg: 'User created'});
    } catch (err) {
        res.status(500).json({err});
    }
}

async function find (req, res) {
    try {
        const userPassword = await User.findByUsername(req.body.username);
        const authed = bcrypt.compare(req.body.password, userPassword);
        if (authed) {
            res.status(200).json({user});
        } else {
            throw new Error('Invalid Passowrd');
        }
    } catch (err) {
        res.status(403).json({err});
    }
}

module.exports = {create, find};
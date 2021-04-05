const User = require('../models/User');
const bcrypt = require('bcrypt');

async function create (req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({...req.body, password: hashed});
        if (!user) {
            throw new Error("User could not be created");
        }
        res.status(201).json({msg: 'User created'});
    } catch (err) {
        res.status(500).json({err});
    }
}

async function find (req, res) {
    try {
        const user = await User.findByUsername(req.body.username);
        if (!user) {
            throw new Error('Invalid Username')
        }
        const authed = await bcrypt.compare(req.body.password, user.password);
        if (!!authed) {
            res.status(200).json(user.id);
        } else {
            throw new Error('Invalid Password');
        }
    } catch (err) {
        res.status(403).json({err});
    }
}

module.exports = {create, find};
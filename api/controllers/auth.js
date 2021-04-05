const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/User');
const router = express.Router(); 

router.post('/register', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({...req.body, password: hashed});
        res.status(201).json({msg: `Registration for ${user.username} has been successful!`});
    } catch(err){
        res.status(500).json({err});
    }
    
}); 


module.exports = router;
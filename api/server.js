const express = require('express');
const cors = require('cors');


const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require('./routes/users');
const authRoute = require('./controllers/auth')

const habitRoutes = require('./routes/habits')

server.use('/habits', habitRoutes)

server.get('/', (req, res) => {
    res.status(200)
    .send('Welcome to a habit tracker')
});

server.use('/auth', authRoute);
server.use('/users', userRoutes);
module.exports = server

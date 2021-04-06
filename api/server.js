const express = require('express');
const cors = require('cors');


const server = express();
server.use(cors());
server.use(express.json());

const authRoute = require('./controllers/auth')

server.get('/', (req, res) => {
    res.status(200)
    .send('Welcome to a habit tracker')
});

server.use('/auth', authRoute);



module.exports = server

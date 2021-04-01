const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
    res.status(200)
    .send('Welcome to a habit tracker')
});


module.exports = server
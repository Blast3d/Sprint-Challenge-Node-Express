// imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // HTTP request logger which logs even if app  crashes
const helmet = require('helmet'); // security middleware

const actionRoutes = require('./routes/actionRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');

const server = express(); // initialize server

// no custom middleware because I'm lazy

// middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

server.get('/', function (req, res) {
  res.json({
    api: 'Running...'
  });
});

const port = 5000
server.listen(port, () => console.log('Server listening on port', port));
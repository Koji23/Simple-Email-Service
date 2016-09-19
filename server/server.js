const express = require('express');
const middleware = require('./config/middleware.js');
const routes = require('./config/routes.js');
const environment = require('./environment/developement.js');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

middleware(app);
routes(app, io);

server.listen(environment.port, console.log("Listening on port", environment.port));
module.exports = app;
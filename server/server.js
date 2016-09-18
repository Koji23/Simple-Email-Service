const express = require('express');
const middleware = require('./config/middleware.js');
const routes = require('./config/routes.js');
const environment = require('./environment/developement.js');

const app = express();

middleware(app);
routes(app);

app.listen(environment.port, console.log("Listening on port", environment.port));
module.exports = app;
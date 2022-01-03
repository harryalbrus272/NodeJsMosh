//Major.Minor.Patch
const _ = require('underscore');
// Core Modules
// File or Folder
// node_modules
console.log(_.contains([1, 2, 3], 3));

const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const error = require('./middleware/error');
const log = require('./middleware/logger');
//monkey-patch all the async route handlers
require('express-async-errors');
const config = require('config');
/** The name space is passed in the environment variables. You can use the wildcard a app.* to select the namespace */
const startDebugger = require('debug')('app:startup'); //arbitary name space in the argument
const dbDebugger = require('debug')('app:db');
require('./startup/logging')();
require('./startup/db')();

const app = express();

//express.json middleware
app.use(express.json());
//in-built middleware
app.use(express.urlencoded({ extended: true }));
//static assets in this folder
app.use(express.static('public'));
//Custom middleware function

//Third -party middlewares
app.use(helmet());
app.use('/', require('./routes'));
//Error middleware in-built provided by express
app.use(error);
//Configuration - We can use npm rc package. But the config is better to store the configurations
console.log('Application Name: ', config.get('name'));
console.log('Mail Server: ', config.get('mail.host'));
console.log('Mail Password: ', config.get('mail.password'));
console.log(`Node environment: ${process.env.NODE_ENV}`); //development, testing, staging and production
console.log(`Environment in which the app is running: ${app.get('env')}`);
/** Middleware functions are called in order they are passed to the app */
if (app.get('env') === 'development' || 'test') {
  app.use(morgan('tiny'));
  startDebugger('Morgan logging');
}

dbDebugger('Connected to the Database');

app.use(log);
require('dotenv').config();
const PORT = process.env.PORT;

/** Templating engines are used when the response is in HTML format - Pug, Ejs, Mustache */
app.set('view engine', 'pug');
app.set('views', './views');

console.log(PORT);

const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = server;

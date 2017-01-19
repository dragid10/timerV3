/*
 Name: Alex Oladele
 Date: 1/12/2017
 Course: CSE 270e
 */

/*
 * Modules
 */
var express = require('express'),
    config = require('./server/configure'), // configure.js
    app = express(), // assigns global var app to the express function
    mongoose = require('mongoose'); // require mongoose
var MongoClient = require('mongodb').MongoClient,
    mongoURL = 'mongodb://localhost/timerv3';

/*Defines constants for the application using node.*/

// Constant that sets port equal to the default port of the system. Fallback port is 3300
// Port = 3610
app.set('port', process.env.PORT || 3630);

// Constant that Sets views to the views directory
// views = views folder
app.set('views', __dirname + '/views');

// Passes app through the config (configure.js) module
app = config(app);

// Necessary for some reason
mongoose.Promise = global.Promise;
// mongoose.Promise = require('bluebird');
// Print to console on successful mongo connection
mongoose.connect(mongoURL);
mongoose.connection.on('open', function () {
    console.log('Mongoose connected at: ' + mongoURL);
});

// Listens for when the server is up and prints a message to the console
var server = app.listen(app.get("port"), function () {
    console.log("Server up: http://127.0.0.1:" + app.get("port"));
});
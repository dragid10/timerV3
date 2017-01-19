/*
 Name: Alex Oladele
 Date: 1/12/2017
 Course: CSE 270e
 */

/*Makes a map of each available URL path for the Program*/

// Grab modules needed
var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.Promise = global.Promise;



// Creates the module that this file is and attaches all the routes to the app instance
// Routes to the proper controller and data for the controller | Remember that home is a var, and index.js is one of its properties

module.exports = function (app) {
    /**
     * @param path - The path that the browser must go to in order to invoke the callback function
     * @param callBack - The controller that handles what happens when the browser goes to this page
     */
    router.get('/', home.index);
    router.get('/about', home.about);
    router.get('/loginform', home.loginform);
    router.get('/register', home.register);
    router.get('/logout', home.logout);
    // router.get('/api/v1/:username/:timerNum',api.getTimer);
    router.post('/loginform', home.loginFormSubmit);
    router.post('/register', home.registerFormSubmit);

    // Attaches routes to app instance
    app.use(router);
};
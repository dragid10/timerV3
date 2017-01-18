/*
 Name: Alex Oladele
 Date: 1/12/2017
 Course: CSE 270e
 */

// Modules
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    User = new require('../models').User,
    passwordHash = require('password-hash');
mongoose.Promise = global.Promise;


// Necessary to see if user already has a session
var loginid = "",
    username = "",
    password = "",
    email = "",
    failure = {},
    u,
    // good = 888, bad = 666, default = 0
    statusK = 0;

// Necessary for some reason
mongoose.Promise = global.Promise;

// ======================================== Functions
function isEmpty(str) {
    return (!str || 0 === str.length);
}
// ======================================== End Functions

// Exports Module with single function called index.js
module.exports = {
    /**
     *
     * @param req What the browser sends sends to the server (modified using middleware)
     * @param res What the server is ending back to the browser / client
     */
    index: function (req, res) {
        // Puts the loginid in a viewModel to return to the timer page
        var viewModel = {
            loginid: loginid
        };

        // If user is not already logged in, then they are shown the main page
        if (loginid === "" || loginid === null || loginid === undefined) {
            res.render('main');

        } else {
            // If user is already logged in, then they are automatically directed to the timer page
            res.render('timer', viewModel);
        }
    },

    about: function (req, res) {
        // Puts the loginid in a viewModel to return to the about page
        var viewModel = {
            loginid: loginid
        };

        // Checks to see if use is logged in, to keep login/out btn consistent across all pages
        if (loginid === "" || loginid === null || loginid === undefined) {
            res.render('about');
        } else {
            res.render('about', viewModel);
        }

        // Takes user to the about page
    },

    loginform: function (req, res) {
        // Takes user to login form
        res.render("loginform");
    },

    register: function (req, res) {
        res.render("register");
    },

    logout: function (req, res) {
        // Clears user's session ID and takes them back to home page
        loginid = "";
        res.redirect('/');
    },

    loginFormSubmit: function (req, res) {
        var dataIn = req.body;

        // Checks to verify that both pieces of information are there, and that password equals test
        if (dataIn.username && dataIn.password && dataIn.password === "test") {
            req.session.userid = dataIn.username;
            loginid = req.session.userid;

            res.redirect('/');
        } else {
            req.session.userid = dataIn.username;
            var userid1 = req.session.userid;

            // viewModel sent back if the password was incorrect
            var failure = {
                errormsg: "invalid username or password",
                userid:   userid1
            };
            res.render('loginform', failure)
        }
    },

    registerFormSubmit: function (req, res) {
        if (req) {
            u = new User({
                username: req.body.username,
                password: req.body.password,
                email:    req.body.email
            });


            // Sanitizes data (removes any html tags) and trims whitespace
            username = u.username.replace(/<.*?>/g, "").trim();
            password = u.password.replace(/<.*?>/g, "").trim();
            email = u.email.replace(/<.*?>/g, "").trim();

            // If any of the fields are empty after sanitation, then return an error using the view model
            if (isEmpty(u.username) || isEmpty(password) || isEmpty(u.email)) {
                // viewModel sent back if the username or password is empty
                failure = {
                    errormsg: "Invalid username, password, or email",
                    userid:   username
                };
                res.render('register', failure);
            }

            // Hashes the password to become the "hashword" (ha)
            var hashword = passwordHash.generate(u.password);
            if (passwordHash.isHashed(hashword)) {
                u.password = hashword;
            }

            function check(callback) {
                // Checks to see if the username already exists in the db
                u.checkExists(u.username, function (err, res) {
                    // If error comes back, or res is null, then the user already exists
                    if (err || res === null) {
                        console.log(err);
                        failure = {
                            errormsg: "User already exists1!"
                        };
                        status = 666;
                        callback(status);
                    } else {
                        // Means that user does not exist and will be saved
                        status = 888;
                        callback(status);
                    }
                });
            }

            // Callback to do after checking is user is already in system or not
            check(function (status) {
                // 666 means bad!
                if (status === 666) {
                    res.render('register', failure);
                } else if (status === 888) {
                    // 888 means good!
                    u.save();
                    var vModel = {
                        userid: u.username
                    };
                    loginid = u.username;
                    // Redirect to the login page with the login id
                    res.redirect('/');
                } else {
                    console.log("Status was 0!");
                }
            })
        }
    }
};
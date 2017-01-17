/*
 Name: Alex Oladele
 Date: 1/12/2017
 Course: CSE 270e
 */

// Necessary to see if user already has a session
var loginid = "";

// Exports Module with single function called index
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
            // res.render('timer')
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
    }
};
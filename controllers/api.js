/*
 Name: Alex Oladele
 Date: 1/12/2017
 Course: CSE 270e
 */

// Modules
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    User = new require('../models').User,
    Timer = new require('../models').Timer,
    passwordHash = require('password-hash');
mongoose.Promise = global.Promise;

module.exports = {
    getTimer: function (req, res) {
        var a = Timer.find({username: req.params.username, timerNum: req.params.timerNum}, function (err, result) {
            var d = {};
            if (err) {
                d.error = err;
                console.log("get timer error ");
                console.log(err);
            } else {
                if (result[0])
                    d.timer = result[0];
                else
                    d.timer = "";
                d.error = "";
            }
            res.json(d);
        });
    },

    putTimer: function (req, res) {
        var d = {};
        var inTimer = new Timer;
        var dataIn = req.body;

        function checkForUser(callback) {
            Timer.find({username: req.params.username, timerNum: req.params.timerNum}, function (err, result) {
                if (err) {
                    var e = new Error("An error occured searching from the database!");
                    console(e);
                    callback(e, null);
                } else {
                    console.log("Database successfully searched. " + result.length + " result came back");
                    callback(null, result);
                }
            })
        }

        // TODO Old sstuff, fix later
        /*debugger;
         var dataIn = req.body, query = {username: req.params.username, timerNum: req.params.timerNum};

         var b = Timer.findOne(query, function (err, doc) {
         if (err) {
         var e = new Error("Error updating Data!");
         console.log(e);
         } else {
         // doc = doc.toObject();
         console.log(doc);
         console.log(doc[0]);
         inTimer = doc;
         d.save();
         }
         });
         res.json(d);
         */
        /*  var a =
         Timer.find(query,  function (err, result) {
         if (err) {
         d.error = err;
         console.log("get timer error ");
         console.log(err);
         } else if (result.length > 0) {

         } else {
         /!*if (result[0])
         d.timer = result[0];
         else
         d.timer = "";
         d.error = "";*!/
         d.timer = req.params.timerNum;

         console.log("Stored timer");
         }
         inTimer = {
         username:  req.body.username,
         timerName: req.body.timerName,
         timerNum:  req.body.timerNum,
         doneTime:  req.body.doneTime,
         state:     req.body.state
         };
         inTimer.save();

         res.json(d);
         });*/
    }

};
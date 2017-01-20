/**
 * Name: Alex Oladele
 * Date: 1/17/17
 * Course CSE 270e
 * Assignment: Timer v2.0
 */



var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path');
mongoose.Promise = global.Promise;

var TimerSchema = new Schema({
    username:  String,
    timerName: String,
    timerNum:  Number,
    doneTime:  {type: Number, default: -1},
    state:     {type: Number, default: 0}
});

var Timer = mongoose.model('Timer', TimerSchema);

var a = new Timer({username: "scott"});
a.save(function (err) {
    if (err)
        console.log("This is an error: " + err);
});

module.exports = Timer;




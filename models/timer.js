/**
 * Name: Alex Oladele
 * Date: 1/17/17
 * Course CSE 270e
 * Assignment: Timer v2.0
 */



var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    passwordHash = require('password-hash');
mongoose.Promise = global.Promise;

var TimerSchema = new mongoose.Schema({
    username:  String,
    timerName: String,
    timerNum:  Number,
    doneTime:  {type: Number, default: -1},
    state:     {type: Number, default: 0}
});

var Timer = mongoose.model('Timer', TimerSchema);

module.exports = Timer;




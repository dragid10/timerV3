/**
 * Name: Alex Oladele
 * Date: 1/17/17
 * Course CSE 270e
 * Assignment: Timer v2.0
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path');


var UserSchema = new Schema({
    username:   {type: String},
    password:   {type: String},
    email:      {type: String},
    lastAccess: {type: Date, default: Date.now},
    visits:     {type: Number, default: 0},
    admin:      {type: Boolean, default: false}
});

// ==================================================== Functions
UserSchema.methods.checkPassword = function (username, password, callback) {
    this.model('User').find({username: username}, function (error, result) {
        if (error) {
            // TODO
        }
    })
};

UserSchema.pre('save', function (next) {
    console.log(this);
//    See if User exists nad if so, throw error
    if (this) {
        // TODO From slides
    }
});
// ==================================================== End Functions


module.exports = mongoose.model('User', UserSchema);
/*
 var a = new UserSchema({username: "scott", password: "hello", email: "campbest@miamioh.edu"});
 a.save(function (err) {
 if (err)
 console.log(err);
 });*/

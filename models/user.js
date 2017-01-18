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


var UserSchema = new Schema({
    username:   String,
    password:   String,
    email:      String,
    lastAccess: {type: Date, default: Date.now},
    visits:     {type: Number, default: 0}
});

var User = mongoose.model('User', UserSchema);

// ==================================================== Functions
/**
 *
 * @param username - Username to check if password is correct
 * @param password - Password to check for
 * @param callback - What to do post check
 */
UserSchema.methods.checkPassword = function (username, password, callback) {
    this.model('User').find({username: username}, function (error, result) {
        if (error) {
            // TODO
        }
    })
};

UserSchema.methods.checkExists = function (username, callback) {
    this.model('User').find({username: username}, function (error, result) {
        if (error) {
            console.log(error)
        }
        return result.length > 0;
    })
};

UserSchema.pre('save', function (next) {
    console.log(this);

    //see if user exists and if so throw err
    if (this.username.length < 2 || this.password.length < 2 || this.email.length < 2) {
        var e = new Error("Invalid username, password or email");
        next(e);
    }
});

// ==================================================== End Functions


var a = new User({username: "scott", password: "hello", email: "campbest@miamioh.edu"});

a.save(function (err) {
    if (err)
        console.log(err);
});
module.exports = User;




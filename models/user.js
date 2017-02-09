var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');
//    User = require('../models/user');

// User Schema
var userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
})

var User = module.exports = mongoose.model('User', userSchema)

module.exports.createUser = function(newUser, callback) {
    // encrypting our password before storing into database
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback)
        });
    });
}

module.exports.getUserByName = function(newUser, callback) {
    var query = {
        username: newUser
    }
    User.findOne(query, callback)
}

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch)
    });
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback)
}

module.exports.userExits = function(newUser, callback) {
    // encrypting our password before storing into database
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback)
        });
    });
}

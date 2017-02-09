var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');


router.get('/login', function(req, res) {
    res.render('login', {
        pageTitle: 'Login ',
        pageID: 'login'
    })
})

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByName(username, function(err, user) {
            if (err) throw error;

            // if user did not find in the database
            if (!user) {
                return done(null, false, {
                    message: "Unknown user"
                })
            }
            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw error;

                // if password is also matched
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, {
                        message: "Invalid Password"
                    })
                }
            })
        })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/feedback',
    failureRedirect: '/login',
    failureFlash: true
}), function(req, res, next) {
    var resObj = {
        "status": false,
        "msg": "username or password is not valid"
    };
    if (req.body.username == "sahil") {
        req.session.username = req.body.username
        resObj.status = true
        resObj.msg = "Login successfully"
    }
    res.send(resObj)
})
module.exports = router;

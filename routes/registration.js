var express = require('express'),
    router = express.Router(),
    User = require('../models/user');

router.get('/registration', function(req, res) {
    res.render('registration', {
        pageTitle : 'Registration ',
        pageID : 'registration'
    })
})
router.post('/registration', function(req, res) {
    var name = req.body.name,
        email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        confirm_password = req.body.confirm_password;

    //validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('confirm_password', 'confirm password is not same').equals(req.body.password);
    req.checkBody('email', 'Email is not valid').isEmail();

    var error = req.validationErrors();
    if (error) {
        error[0].status = false;
        res.send(error[0])
    } else {

        // if validated, save to database
        var newUser = new User({
            name : name,
            username:username,
            password:password,
            email:email
        })

        User.createUser(newUser, function(err, user) {
            if(err) {
                console.log(err);
            } else {
                console.log(user);
            }
        })
        // setting flash message
        req.flash('success_msg', 'you are register and can now login')
        res.send({status:'success', toLogin: "login"})
    }
})


module.exports = router;

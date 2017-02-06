var express = require('express'),
    router = express.Router();


router.get('/login', function(req, res) {
    res.render('login' , {
        pageTitle : 'Login ',
        pageID : 'login'
    })
})

router.post('/login', function(req, res) {
    var resObj = {"status" : false , "msg" : "username or password is not valid"};
    if (req.body.username == "sahil") {
        console.log('Cookies: ', req.cookies)
        console.log('session: ', req.session)
        req.session.username = req.body.username
        resObj.status = true
        resObj.msg = "Login successfully"
    }
   res.send(resObj)
})
module.exports = router;

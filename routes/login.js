var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');

// parse application/json
router.use(bodyParser.json())

router.get('/login', function(req, res) {
    res.render('login' , {
        pageTitle : 'Login ',
        pageID : 'login'
    })
})

router.post('/login', function(req, res) {
    var resObj = {"status" : false , "msg" : "username or password is not valid"};
    if (req.body.username == "sahil") {
        resObj.status = true
        resObj.msg = "Login successfully"
    }
   res.send(resObj)
})
module.exports = router;
